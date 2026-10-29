import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zedu Interactive - Whimsical Human-Agent Lounge",
  description: "Whimsical human-agent interaction workspace designed for Zedu FE",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-purple-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
