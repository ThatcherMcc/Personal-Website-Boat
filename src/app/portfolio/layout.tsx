import PortfolioBodyStyle from "./components/PortfolioBodyStyle";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Inline style ensures dark background from first paint, before JS hydration */}
      <style>{`body { background-color: #070b13 !important; }`}</style>
      <PortfolioBodyStyle />
      {children}
    </>
  );
}
