"use client";

import Script from "next/script";

export function WhisperAIWidget() {
  return (
    <Script
      id="whisperai-chat-support"
      src="https://whisperai.one/api/embed/widget.js?id=0df7eced-864"
      strategy="afterInteractive"
    />
  );
}
