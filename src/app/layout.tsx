import "./globals.css";
import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Syne } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "Thatcher McClure",
  description:
    "Personal website of Thatcher McClure — software engineer, sailor, and builder. Explore my portfolio or embark on the boat adventure.",
  openGraph: {
    title: "Thatcher McClure",
    description:
      "Personal website of Thatcher McClure — software engineer, sailor, and builder.",
    url: "https://thatchermcc.com",
    siteName: "Thatcher McClure",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thatcher McClure",
    description:
      "Personal website of Thatcher McClure — software engineer, sailor, and builder.",
  },
};

export default function rootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${syne.variable}`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
