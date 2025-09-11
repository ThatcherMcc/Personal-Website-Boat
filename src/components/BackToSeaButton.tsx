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
      className="back-to-sea-container hover:scale-110 duration-300"
      onClick={() => router.back()}
    >
      <Image
        src="/weather-icons/sea-water.svg"
        alt="Back to Sea button"
        width={120}
        height={120}
      />
      <span className="text-xl font-semibold text-white">Back To Sea</span>
    </button>
  );
}
