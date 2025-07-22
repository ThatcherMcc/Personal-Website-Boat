import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
