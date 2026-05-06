import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Portfolio",
    template: "%s"
  },
  description: "A modern Sanity-powered personal portfolio."
};

export const viewport: Viewport = {
  themeColor: "#050505"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
