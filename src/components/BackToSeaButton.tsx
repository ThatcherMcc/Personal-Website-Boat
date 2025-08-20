"use client";

import { useRouter } from "next/navigation";


/**
 * @property {object} searchParams - The URL search parameters object from Next.js.
 */
type BackToSeaProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function BackToSeaButton( {searchParams }: BackToSeaProps) {
    const router = useRouter();
    const existsBoatRoom = !!searchParams.room;

    if (!existsBoatRoom) {
        return null;
    }

    return (
        <button className="back-to-sea-container text-2xl font-bold" onClick={() => router.back()}>
            Back<br />To<br />Sea
        </button>
    )
}