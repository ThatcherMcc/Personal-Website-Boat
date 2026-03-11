"use client";

import { motion, useAnimate } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import {
  BOAT_ANIMATION_CONFIG,
  ROOM_ZOOM_CONFIG,
} from "rt/app/boat-adventure/configs/boat-configs";
import { WeatherCondition } from "rt/app/boat-adventure/utils/weather-utils";
import { BoatState, BoatRoom } from "rt/app/boat-adventure/managers/BoatURLManager";

const MotionImage = motion(Image);

/**
 * @property {object} searchParams - The URL search parameters object from Next.js.
 */
type MyBoatProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

/**
 * MyBoat componeent displays and animates a boat based on weather conditions derived from URL search parameters.
 *
 * @param searchParams - search parameters to pull 'weather' from.
 * @returns {JSX.Element} The animated boat image .
 */
export default function MyBoat({ searchParams }: MyBoatProps) {
  const [scope, animate] = useAnimate();

  const boatState = (searchParams.boatState as BoatState) || "exterior";
  const boatRoom = searchParams.room as BoatRoom;

  const getScreenSize = () => {
    if (typeof window === "undefined") {
      return "desktop"; // Default to desktop on the server
    }
    if (window.innerWidth <= 768) {
      return "mobile";
    }
    if (window.innerWidth <= 1024) {
      return "tablet";
    }
    return "desktop";
  };

  const currentRoomConfig = boatRoom
    ? ROOM_ZOOM_CONFIG[getScreenSize()][boatRoom]
    : null;
  // Retrieves the 'weather' parameter from the URl.
  const weatherParam = searchParams.weather as WeatherCondition;

  // Gets and sets current boat animation to its respective weather condition.
  // Default to "BOAT_ANIMATION_CONFIG.sunny" if the weatherParam is undefined.
  const currentAnimationConfig =
    BOAT_ANIMATION_CONFIG[weatherParam] || BOAT_ANIMATION_CONFIG.sunny;

  const handleBoatClick = () => {
    window.dispatchEvent(new CustomEvent("boatClick"));
  };

  const handleRoomClick = (room: BoatRoom) => {
    window.dispatchEvent(new CustomEvent("roomClick", { detail: { room } }));
  };

  const boatDropInAnimation = useCallback(async () => {
    // Initial drop-in animation: boat moves from above to its resting y-position and fades in.
    const dropIn = animate(
      scope.current,
      { y: 0, opacity: 1 },
      {
        type: "spring",
        stiffness: 70,
        damping: 7,
        mass: 1,
      }
    );

    // Stabilization animation: boat tilts slightly then settles at 0 degrees.
    const stabilize = await animate(
      scope.current,
      { x: 0, rotate: 0 },
      {
        type: "spring",
        stiffness: 50,
        damping: 10,
        mass: 0.5,
        delay: 0.14,
      }
    );

    // Wait for both initial animations (drop-in and stabilize) to complete.
    await Promise.all([dropIn, stabilize]);
  }, [animate, scope]);

  const boatIdleAnimation = useCallback(async () => {
    animate(
      scope.current,
      {
        y: [0, currentAnimationConfig.amplitude, 0],
        x: [
          0,
          currentAnimationConfig.distance,
          currentAnimationConfig.distance / -2,
          0,
        ],
        rotate: [
          0,
          currentAnimationConfig.rotation,
          currentAnimationConfig.rotation / -2,
          0,
        ],
      },
      {
        duration: currentAnimationConfig.length,
        repeat: Infinity,
        ease: "easeInOut",
      }
    );
  }, [animate, scope, currentAnimationConfig]);

  const boatZoomOutAnimation = useCallback(async () => {
    const simpleTransition = animate(
      scope.current,
      {
        scale: boatRoom ? 5 : 1,
        x: currentRoomConfig ? currentRoomConfig.x : 0,
        y: currentRoomConfig ? currentRoomConfig.y : 0,
      },
      {
        duration: 1, // This is your zoom-in/out transition duration
        ease: "easeInOut",
      }
    );

    await simpleTransition;
  }, [animate, scope, boatRoom, currentRoomConfig]);

  const boatRoomAnimation = useCallback(async () => {
    animate(
      scope.current,
      {
        rotate: [0, 0.25, -0.25, 0],
      },
      {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }
    );
  }, [animate, scope]);

  /**
   * Enacts the boat's animation sequence:
   * 1. Initial "dropIn"
   * 2. "Stabalize" the boat as if in real water
   * 3. A continuous bobbing and rotaion based on the weather configuration
   *
   * a. if a room is selected change the scale and position to the room config.
   */
  const boatExteriorAnimation = useCallback(async () => {
    await boatDropInAnimation();
    boatIdleAnimation();
  }, [boatDropInAnimation, boatIdleAnimation]);

  const boatInteriorAnimation = useCallback(async () => {
    await boatZoomOutAnimation();
    boatIdleAnimation();
  }, [boatZoomOutAnimation, boatIdleAnimation]);

  // useEffect hook to run the boat animation when relevant dependencies change.
  // This hook ensures the animation starts on mount and re-runs if searchParams change.
  useEffect(() => {
    if (boatState === "interior" && !boatRoom) {
      boatInteriorAnimation();
    } else if (boatState === "interior" && boatRoom) {
      boatRoomAnimation();
    } else {
      boatExteriorAnimation();
    }
  }, [
    boatState,
    boatRoom,
    boatExteriorAnimation,
    boatInteriorAnimation,
    boatRoomAnimation,
  ]);

  if (boatState === "exterior") {
    return (
      <div className="boat-container">
        <MotionImage
          ref={scope}
          className="boat-image cursor-pointer"
          src="/boat/boat.webp"
          alt="Ship with all my treasure"
          width={1180}
          height={998}
          quality={90}
          initial={{ y: -125, opacity: 0, rotate: 15 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleBoatClick}
          priority
        />
      </div>
    );
  }

  return (
    <div className="boat-inside-container">
      <motion.div
        ref={scope}
        animate={{
          scale: boatRoom ? 5 : 1,
          x: currentRoomConfig ? currentRoomConfig.x : 0,
          y: currentRoomConfig ? currentRoomConfig.y : 0,
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
      >
        {/* Interior boat layout */}
        <div className="relative w-full h-full">
          <MotionImage
            src="/boat/boat-inside.webp"
            alt="Interior of the boat"
            width={1200}
            height={999}
            quality={90}
            className="w-full h-auto object-contain"
          />
          {!boatRoom && (
            <div className="absolute inset-0">
              {/* Captains Quarters */}
              <motion.div
                className="absolute top-[75%] left-[3%] w-[21%] h-[6%] cursor-pointer rounded-lg border-2 border-amber-400/30 group/room"
                onClick={() => handleRoomClick("captains-quarters")}
                animate={{ boxShadow: ["0 0 0 0 rgba(251,191,36,0)", "0 0 6px 2px rgba(251,191,36,0.35)", "0 0 0 0 rgba(251,191,36,0)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ backgroundColor: "rgba(180,83,9,0.3)", borderColor: "rgba(251,191,36,0.8)", scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover/room:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <span className="bg-amber-800/90 text-amber-100 px-2 py-0.5 rounded text-xs font-semibold shadow-lg">
                    Captain&apos;s Quarters
                  </span>
                </div>
              </motion.div>
              {/* Treasure Room */}
              <motion.div
                className="absolute top-[82.5%] left-[7%] w-[15.5%] h-[7%] cursor-pointer rounded-lg border-2 border-amber-400/30 group/room2"
                onClick={() => handleRoomClick("treasure-room")}
                animate={{ boxShadow: ["0 0 0 0 rgba(251,191,36,0)", "0 0 6px 2px rgba(251,191,36,0.35)", "0 0 0 0 rgba(251,191,36,0)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.25 }}
                whileHover={{ backgroundColor: "rgba(180,83,9,0.3)", borderColor: "rgba(251,191,36,0.8)", scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover/room2:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <span className="bg-amber-800/90 text-amber-100 px-2 py-0.5 rounded text-xs font-semibold shadow-lg">
                    Treasure Room
                  </span>
                </div>
              </motion.div>
            </div>
          )}

          {boatRoom == "captains-quarters" && (
            <div className="absolute inset-0">
              <motion.a
                className="absolute top-[76.2%] left-[10.1%] w-[3.5%] h-[2.4%] cursor-pointer rounded-sm border border-amber-300/50"
                href="/boat-adventure/captains-quarters"
                animate={{ boxShadow: ["0 0 0 0 rgba(251,191,36,0)", "0 0 4px 2px rgba(251,191,36,0.5)", "0 0 0 0 rgba(251,191,36,0)"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ backgroundColor: "rgba(251,191,36,0.25)", borderColor: "rgba(251,191,36,0.9)" }}
                whileTap={{ scale: 0.95 }}
              />
            </div>
          )}
          {boatRoom == "treasure-room" && (
            <div className="absolute inset-0">
              <motion.a
                className="absolute top-[83.8%] left-[14%] w-[3.4%] h-[2.4%] cursor-pointer rounded-sm border border-amber-300/50"
                href="/boat-adventure/treasure-room"
                animate={{ boxShadow: ["0 0 0 0 rgba(251,191,36,0)", "0 0 4px 2px rgba(251,191,36,0.5)", "0 0 0 0 rgba(251,191,36,0)"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ backgroundColor: "rgba(251,191,36,0.25)", borderColor: "rgba(251,191,36,0.9)" }}
                whileTap={{ scale: 0.95 }}
              />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
