"use client";

import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";
import {
  BOAT_ANIMATION_CONFIG,
  ROOM_ZOOM_CONFIG,
} from "rt/configs/boat-configs";
import { WeatherCondition } from "rt/utils/weather-utils";
import { BoatState, BoatRoom } from "rt/managers/BoatURLManager";

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
  const currentRoomConfig = boatRoom ? ROOM_ZOOM_CONFIG[boatRoom] : null;
  // Retrieves the 'weather' parameter from the URl.
  const weatherParam = searchParams.weather as WeatherCondition;

  // Gets and sets current boat animation to its respective weather condition.
  // Default to "BOAT_ANIMATION_CONFIG.sunny" if the weatherParam is undefined.
  const currentAnimationConfig =
    BOAT_ANIMATION_CONFIG[weatherParam] || BOAT_ANIMATION_CONFIG.sunny;

  const handleBoatClick = () => {
    if (boatState == "exterior") {
      window.dispatchEvent(new CustomEvent("boatClick"));
    }
  };

  const handleRoomClick = (room: BoatRoom) => {
    window.dispatchEvent(new CustomEvent("roomClick", { detail: { room } }));
  };

  const handleBackToSea = () => {
    window.dispatchEvent(new CustomEvent("backToSea"));
  };

  /**
   * Enacts the boat's animation sequence:
   * 1. Initial "dropIn"
   * 2. "Stabalize" the boat as if in real water
   * 3. A continuous bobbing and rotaion based on the weather configuration
   *
   * a. if a room is selected change the scale and position to the room config.
   */
  async function boatExteriorAnimation() {
    await boatDropInAnimation();
    boatIdleAnimation();
  }
  async function boatInteriorAnimation() {
    await boatZoomOutAnimation();
    boatIdleAnimation();
  }
  async function boatDropInAnimation() {
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
  }

  async function boatIdleAnimation() {
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
  }

  async function boatZoomOutAnimation() {
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

    await Promise.all([simpleTransition]);
  }

  async function boatRoomAnimation() {
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
  }

  // useEffect hook to run the boat animation when relevant dependencies change.
  // This hook ensures the animation starts on mount and re-runs if searchParams change.
  useEffect(() => {
    if (boatState === "exterior") {
      boatExteriorAnimation();
    } else if (boatState === "interior" && !boatRoom) {
      boatInteriorAnimation();
    } else if (boatState === "interior" && boatRoom) {
      boatRoomAnimation();
    }
  }, [searchParams, animate, scope]);

  if (boatState === "exterior") {
    return (
      <div className="boat-container">
        <motion.img
          ref={scope}
          className="boat-image cursor-pointer"
          src="/boat/boat.png"
          alt="Ship with all my treasure"
          initial={{ y: -125, opacity: 0, rotate: 15 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleBoatClick}
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
          <motion.img
            src="/boat/boat-inside.png"
            alt="Interior of the boat"
            className="w-full h-auto object-contain"
          />
          {!boatRoom && (
            <div className="absolute inset-0">
              {/* Captains Quarters */}
              <motion.div
                className="absolute top-[75%] left-[3%] w-[21%] h-[6%] cursor-pointer rounded-lg bg-transparent hover:bg-amber-800 hover:bg-opacity-30 border-2 border-transparent hover:border-amber-300"
                onClick={() => handleRoomClick("captains-quarters")}
                title="Captains Quarters"
              >
                <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 hover:opacity-100">
                  <span className="bg-amber-800 text-white px-2 py-1 rounded text-sm font-semibold">
                    Captains Quarters
                  </span>
                </div>
              </motion.div>
            </div>
          )}

          {boatRoom && (
            <div className="absolute inset-0">
              <a
                className="absolute top-[78.7%] left-[6.2%] w-[2.1%] h-[2.1%] cursor-pointer rounded-sm bg-transparent hover:bg-gray-200 hover: opacity-50"
                href="/captains-quarters"
              ></a>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
