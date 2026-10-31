import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zedu Interactive - Agent Lounge",
  description: "Interactive human-agent workspace and co-pilot playground designed for Zedu FE",
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
