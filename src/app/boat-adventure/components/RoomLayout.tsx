import Image from "next/image";
import AllowScroll from "./AllowScroll";

interface RoomLayoutProps {
  backgroundSrc: string;
  backgroundAlt?: string;
  blurClass?: string;
  children: React.ReactNode;
}

export default function RoomLayout({
  backgroundSrc,
  backgroundAlt = "",
  blurClass = "backdrop-blur-md",
  children,
}: RoomLayoutProps) {
  return (
    <>
      <AllowScroll />
      <div className="fixed inset-0 w-full h-full z-0">
        <Image
          src={backgroundSrc}
          alt={backgroundAlt}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className={`absolute inset-0 w-full h-full ${blurClass}`} />
      </div>
      {children}
    </>
  );
}
