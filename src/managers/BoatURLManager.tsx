"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export type BoatState = "exterior" | "interior";
export type BoatRoom = "captains-quarters" | "treasure-room" | null;

export default function BoatStateURLManager() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateBoatState = (newState: BoatState) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("boatState", newState);
    if (newState == "exterior") {
      newSearchParams.delete("room");
    }
    router.push(`?${newSearchParams}`, { scroll: false });
  };

  const updateRoom = (newRoom: BoatRoom) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (newRoom) {
      newSearchParams.set("room", newRoom);
    } else {
      newSearchParams.delete("room");
    }
    router.push(`?${newSearchParams}`, { scroll: false });
  };

  useEffect(() => {
    const boatState =
      (searchParams.get("boatState") as BoatState) || "exterior";
    console.log(boatState);

    if (!boatState) {
      updateBoatState("exterior");
      return;
    }

    const handleExteriorClick = () => {
      if (boatState != "exterior") {
        updateBoatState("exterior");
      }
    };

    const handleBoatClick = () => {
      if (boatState != "interior") {
        updateBoatState("interior");
      }
    };

    const handleRoomClick = (event: CustomEvent) => {
      updateRoom(event.detail.room);
    };

    const handleBackToSea = () => {
      updateBoatState("exterior");
    };

    window.addEventListener("exteriorClick", handleExteriorClick);
    window.addEventListener("boatClick", handleBoatClick);
    window.addEventListener("roomClick", handleRoomClick as EventListener);
    window.addEventListener("backToSea", handleBackToSea);

    return () => {
      window.addEventListener("exteriorClick", handleExteriorClick);
      window.removeEventListener("boatClick", handleBoatClick);
      window.removeEventListener("roomClick", handleRoomClick as EventListener);
      window.removeEventListener("backToSea", handleBackToSea);
    };
  }, [router, searchParams]);

  return null;
}
