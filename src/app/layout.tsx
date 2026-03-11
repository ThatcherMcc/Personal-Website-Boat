import "./globals.css";
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

/**
 * rootLayout component provides the HTML structure for all pages.
 * It acts as a shared UI wrapper that persists across different routes.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content of the current page or nested layout.
 * This will typically be your "page.tsx" component.
 * @returns {JSX.Element} The root HTML structure for the application.
 */
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
