import PortfolioBodyStyle from "./components/PortfolioBodyStyle";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PortfolioBodyStyle />
      {children}
    </>
  );
}
