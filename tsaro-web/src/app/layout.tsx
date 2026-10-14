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
  metadataBase: new URL("https://tsaroglobaldefence.com"),
  title: {
    default: "Tsaro Global Defence | Strategic Defense Infrastructure & Tactical Intelligence",
    template: "%s | Tsaro Global Defence",
  },
  description:
    "Tsaro Global Defence architects, engineers, and deploys physical security infrastructure, tactical intelligence systems, kinetic countermeasures, and command training for sovereign governments and multinational enterprises.",
  keywords: [
    "Tsaro Global Defence",
    "strategic defense infrastructure",
    "tactical intelligence systems",
    "sovereign defense contracting",
    "critical national infrastructure protection",
    "kinetic security systems",
    "defense technology solutions",
    "tactical training academy",
    "institutional risk mitigation",
    "sovereign protection services",
  ],
  authors: [{ name: "Tsaro Global Defence Systems Directorate" }],
  creator: "Tsaro Global Defence",
  publisher: "Tsaro Global Defence",
  applicationName: "Tsaro Global Defence Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tsaroglobaldefence.com",
    title: "Tsaro Global Defence | Strategic Defense Infrastructure & Tactical Intelligence",
    description:
      "Tsaro Global Defence architects, engineers, and deploys physical security infrastructure, tactical intelligence systems, kinetic countermeasures, and command training for sovereign governments and multinational enterprises.",
    siteName: "Tsaro Global Defence",
    images: [
      {
        url: "/hero-banner.png",
        width: 1200,
        height: 630,
        alt: "Tsaro Global Defence Strategic Command Operations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tsaro Global Defence | Strategic Defense Infrastructure & Tactical Intelligence",
    description:
      "Architecting sovereign defense infrastructure, tactical intelligence platforms, and security capabilities for governments and enterprises worldwide.",
    images: ["/hero-banner.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/tsaro-icon.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/tsaro-icon.png",
    apple: "/tsaro-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GovernmentOrganization",
  "name": "Tsaro Global Defence",
  "alternateName": "Tsaro Defence",
  "url": "https://tsaroglobaldefence.com",
  "logo": "https://tsaroglobaldefence.com/tsaro-logo.png",
  "image": "https://tsaroglobaldefence.com/hero-banner.png",
  "description":
    "Tsaro Global Defence architects and deploys physical defense infrastructure, kinetic countermeasures, tactical intelligence systems, and specialized command training for sovereign institutions and enterprise partners.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "NG",
    "addressLocality": "Abuja",
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "Institutional Operations & Inquiries",
      "email": "info@tsaroglobaldefence.com",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${jost.variable} ${jetbrainsMono.variable} ${playfair.variable} bg-obsidian text-white antialiased selection:bg-brandRed selection:text-white font-sans overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
