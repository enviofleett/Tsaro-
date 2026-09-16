import type { Metadata } from "next";
import { Jost, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Tsaro Global Defence | Strategic Defense Infrastructure & Intelligence",
  description: "Tsaro Global Defence architects and deploys physical security infrastructure, tactical intelligence systems, and defense technologies for sovereign governments and multinational enterprises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${jost.variable} ${jetbrainsMono.variable} ${playfair.variable} bg-obsidian text-white antialiased selection:bg-brandRed selection:text-white font-sans overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
