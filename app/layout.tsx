import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MailQuest — Turn your inbox into an adventure",
  description: "A playable quest built from the work you choose to tackle.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

