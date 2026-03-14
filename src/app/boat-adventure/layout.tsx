import type { Metadata } from "next";
import BoatErrorBoundary from "rt/app/boat-adventure/components/BoatErrorBoundary";
import PageEnterAnimation from "rt/app/boat-adventure/components/PageEnterAnimation";
import SoundManager from "rt/app/boat-adventure/components/SoundManager";

export const metadata: Metadata = {
  title: "Boat Adventure — Thatcher McClure",
  description:
    "Embark on an interactive journey aboard Thatcher McClure's digital ship. Explore his work, skills, and projects in a unique, creative way.",
  openGraph: {
    title: "Boat Adventure — Thatcher McClure",
    description:
      "An interactive creative experience — explore Thatcher McClure's portfolio aboard a digital ship.",
    url: "https://thatchermcc.com/boat-adventure",
    siteName: "Thatcher McClure",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boat Adventure — Thatcher McClure",
    description:
      "An interactive creative experience — explore Thatcher McClure's portfolio aboard a digital ship.",
  },
};

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
