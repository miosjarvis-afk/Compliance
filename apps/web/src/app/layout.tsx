import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Trust Layer",
  description: "Trust Infrastructure für AI-Agenturen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">{children}</body>
    </html>
  );
}
