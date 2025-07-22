"use client";

import { motion, useAnimate } from "motion/react";
import { useEffect } from "react";
import { BOAT_ANIMATION_CONFIG } from "rt/configs/boat-configs";
import { WeatherCondition } from "rt/utils/weather-utils";

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

  // Retrieves the 'weather' parameter from the URl.
  const weatherParam = searchParams.weather as WeatherCondition;

  // Gets and sets current boat animation to its respective weather condition.
  // Default to "BOAT_ANIMATION_CONFIG.sunny" if the weatherParam is undefined.
  const currentAnimationConfig =
    BOAT_ANIMATION_CONFIG[weatherParam] || BOAT_ANIMATION_CONFIG.sunny;

  /**
   * Enacts the boat's animation sequence:
   * 1. Initial "dropIn"
   * 2. "Stabalize" the boat as if in real water
   * 3. A continuous bobbing and rotaion based on the weather configuration
   */
  async function boatAnimation() {
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
      { rotate: 0 },
      {
        type: "spring",
        stiffness: 40,
        damping: 10,
        mass: 0.5,
        delay: 0.2,
      }
    );

    // Wait for both initial animations (drop-in and stabilize) to complete.
    await Promise.all([dropIn, stabilize]);

    // Continuous bobbing and rotating animation.
    // This animation runs indefinitely (`repeat: Infinity`).
    animate(
      scope.current,
      {
        y: [
          0,
          currentAnimationConfig.amplitude,
          currentAnimationConfig.amplitude / 4,
          0,
        ],
        rotate: [
          0,
          currentAnimationConfig.rotation,
          currentAnimationConfig.rotation / -1,
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

  // useEffect hook to run the boat animation when relevant dependencies change.
  // This hook ensures the animation starts on mount and re-runs if searchParams change.
  useEffect(() => {
    boatAnimation();
  }, [searchParams, animate, scope]);

  return (
    <div className="boat-container">
      <motion.img
        ref={scope}
        className="boat-image"
        src="/NewBoat.png"
        alt="Ship with all my treasure"
        initial={{ y: -150, opacity: 0, rotate: -15 }} // Start from above and faded
        whileHover={{ scale: 1.05 }}
      />
    </div>
  );
}
