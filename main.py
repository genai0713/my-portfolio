import logging
import os
import re
import sqlite3
import time
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Optional

import gspread
from dotenv import load_dotenv
from oauth2client.service_account import ServiceAccountCredentials
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
)


@dataclass
class Settings:
    whatsapp_group_name: str
    chrome_binary: str
    chrome_profile_dir: str
    google_service_account_file: str
    google_sheet_id: str
    google_worksheet_name: str
    poll_interval_seconds: int
    sqlite_db_path: str
    sales_regex: str


@dataclass
class SaleRecord:
    captured_at: str
    group_name: str
    sender: str
    message_id: str
    raw_text: str
    customer: str
    product: str
    amount: str
    phone: str
    parse_status: str


def load_settings() -> Settings:
    load_dotenv()
    return Settings(
        whatsapp_group_name=require_env("WHATSAPP_GROUP_NAME"),
        chrome_binary=require_env("CHROME_BINARY"),
        chrome_profile_dir=require_env("CHROME_PROFILE_DIR"),
        google_service_account_file=require_env("GOOGLE_SERVICE_ACCOUNT_FILE"),
        google_sheet_id=require_env("GOOGLE_SHEET_ID"),
        google_worksheet_name=require_env("GOOGLE_WORKSHEET_NAME"),
        poll_interval_seconds=int(os.getenv("POLL_INTERVAL_SECONDS", "15")),
        sqlite_db_path=os.getenv("SQLITE_DB_PATH", "state.db"),
        sales_regex=require_env("SALES_REGEX"),
    )


def require_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"Missing required environment variable: {name}")
    return value


class MessageStore:
    def __init__(self, db_path: str) -> None:
        self.connection = sqlite3.connect(db_path)
        self.connection.execute(
            """
            CREATE TABLE IF NOT EXISTS processed_messages (
                message_id TEXT PRIMARY KEY,
                processed_at TEXT NOT NULL
            )
            """
        )
        self.connection.commit()

    def has(self, message_id: str) -> bool:
        cursor = self.connection.execute(
            "SELECT 1 FROM processed_messages WHERE message_id = ?",
            (message_id,),
        )
        return cursor.fetchone() is not None

    def add(self, message_id: str) -> None:
        self.connection.execute(
            "INSERT OR IGNORE INTO processed_messages (message_id, processed_at) VALUES (?, ?)",
            (message_id, datetime.now(timezone.utc).isoformat()),
        )
        self.connection.commit()


class SheetsClient:
    def __init__(self, settings: Settings) -> None:
        scopes = [
            "https://spreadsheets.google.com/feeds",
            "https://www.googleapis.com/auth/spreadsheets",
            "https://www.googleapis.com/auth/drive",
        ]
        credentials = ServiceAccountCredentials.from_json_keyfile_name(
            settings.google_service_account_file,
            scopes,
        )
        client = gspread.authorize(credentials)
        self.worksheet = client.open_by_key(settings.google_sheet_id).worksheet(
            settings.google_worksheet_name
        )

    def append_record(self, record: SaleRecord) -> None:
        self.worksheet.append_row(
            [
                record.captured_at,
                record.group_name,
                record.sender,
                record.message_id,
                record.raw_text,
                record.customer,
                record.product,
                record.amount,
                record.phone,
                record.parse_status,
            ],
            value_input_option="USER_ENTERED",
        )


class WhatsAppWatcher:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings
        options = Options()
        options.binary_location = settings.chrome_binary
        options.add_argument(f"--user-data-dir={settings.chrome_profile_dir}")
        options.add_argument("--profile-directory=Default")
        options.add_argument("--disable-gpu")
        options.add_argument("--no-sandbox")
        self.driver = webdriver.Chrome(options=options)
        self.wait = WebDriverWait(self.driver, 60)

    def open_group(self) -> None:
        self.driver.get("https://web.whatsapp.com/")
        self.wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "div[contenteditable='true']"))
        )

        search_box = self._find_search_box()
        search_box.click()
        search_box.send_keys(Keys.COMMAND, "a")
        search_box.send_keys(Keys.BACKSPACE)
        search_box.send_keys(self.settings.whatsapp_group_name)
        time.sleep(2)
        search_box.send_keys(Keys.ENTER)
        time.sleep(2)

    def _find_search_box(self):
        selectors = [
            "div[aria-label='Search input textbox']",
            "div[title='Search input textbox']",
            "div[contenteditable='true'][data-tab='3']",
        ]
        for selector in selectors:
            try:
                return self.wait.until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, selector))
                )
            except TimeoutException:
                continue
        raise RuntimeError("Unable to find WhatsApp search box")

    def fetch_visible_messages(self) -> list[dict]:
        containers = self.driver.find_elements(By.CSS_SELECTOR, "div[data-testid='msg-container']")
        messages = []
        for container in containers:
            message_id = container.get_attribute("data-id") or ""
            if not message_id:
                continue

            text = self._extract_text(container)
            if not text:
                continue

            sender = self._extract_sender(container)
            messages.append(
                {
                    "message_id": message_id,
                    "sender": sender,
                    "text": text,
                }
            )
        return messages

    def _extract_text(self, container) -> str:
        selectors = [
            "span.selectable-text",
            "div.copyable-text",
        ]
        for selector in selectors:
            try:
                elements = container.find_elements(By.CSS_SELECTOR, selector)
                parts = [element.text.strip() for element in elements if element.text.strip()]
                if parts:
                    return "\n".join(parts)
            except NoSuchElementException:
                continue
        return ""

    def _extract_sender(self, container) -> str:
        selectors = [
            "span[dir='auto'][role='button']",
            "div[aria-label][role='button']",
        ]
        for selector in selectors:
            elements = container.find_elements(By.CSS_SELECTOR, selector)
            for element in elements:
                text = element.text.strip()
                if text:
                    return text
        return "unknown"


def parse_sale(settings: Settings, group_name: str, message: dict) -> Optional[SaleRecord]:
    match = re.search(settings.sales_regex, message["text"], flags=re.IGNORECASE)
    if not match:
        return None

    groups = match.groupdict()
    return SaleRecord(
        captured_at=datetime.now(timezone.utc).isoformat(),
        group_name=group_name,
        sender=message["sender"],
        message_id=message["message_id"],
        raw_text=message["text"],
        customer=groups.get("customer", "").strip(),
        product=groups.get("product", "").strip(),
        amount=groups.get("amount", "").strip(),
        phone=groups.get("phone", "").strip(),
        parse_status="parsed",
    )


def main() -> None:
    settings = load_settings()
    store = MessageStore(settings.sqlite_db_path)
    sheets = SheetsClient(settings)
    watcher = WhatsAppWatcher(settings)

    logging.info("Opening WhatsApp group: %s", settings.whatsapp_group_name)
    watcher.open_group()

    while True:
        try:
            for message in watcher.fetch_visible_messages():
                if store.has(message["message_id"]):
                    continue

                record = parse_sale(settings, settings.whatsapp_group_name, message)
                store.add(message["message_id"])

                if not record:
                    logging.info("Skipping non-sale message: %s", message["message_id"])
                    continue

                sheets.append_record(record)
                logging.info("Appended sale message %s to Google Sheets", message["message_id"])
        except Exception as exc:
            logging.exception("Polling failed: %s", exc)

        time.sleep(settings.poll_interval_seconds)


if __name__ == "__main__":
    main()
