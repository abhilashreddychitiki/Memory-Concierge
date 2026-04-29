import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Memory Concierge - The Aurelian Vale",
  description: "AI-powered luxury concierge that remembers every guest."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
