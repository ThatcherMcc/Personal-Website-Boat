"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

/**
 * @property {object} searchParams - The URL search parameters object from Next.js.
 */
type BackToSeaProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function BackToSeaButton({ searchParams }: BackToSeaProps) {
  const router = useRouter();
  const existsBoatRoom = !!searchParams.room;

  if (!existsBoatRoom) {
    return null;
  }

  return (
    <button
      className="weather-info-container hover:scale-110 duration-300"
      onClick={() => router.back()}
    >
      <div className="relative h-16 md:h-24 lg:h-36">
        <Image
          src="/weather-icons/sea-water.svg"
          alt="Back to Sea button"
          fill
        />
      </div>
      <span className="text-sm md:text-md lg:text-xl font-semibold text-white">
        Back To Sea
      </span>
    </button>
  );
}
