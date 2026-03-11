import BoatErrorBoundary from "rt/app/boat-adventure/components/BoatErrorBoundary";
import PageEnterAnimation from "rt/app/boat-adventure/components/PageEnterAnimation";
import SoundManager from "rt/app/boat-adventure/components/SoundManager";

export default function BoatAdventureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BoatErrorBoundary>
      <PageEnterAnimation>{children}</PageEnterAnimation>
      <SoundManager />
    </BoatErrorBoundary>
  );
}
