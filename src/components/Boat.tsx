'use client';
import { motion, useAnimate} from "motion/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { BoatAnimationConfig} from "rt/configs/boatConfigs";
import { WEATHER_STATES, WeatherCondition } from "rt/utils/weatherUtils";

type MyBoatProps = {
  searchParams: { [key: string]: string | string[] | undefined};
}

export default function MyBoat({ searchParams }: MyBoatProps) {

  const [scope, animate] = useAnimate();

  const weatherParam = searchParams.weather as WeatherCondition || BoatAnimationConfig.sunny

  
  // Use the validated condition to get the config. No '||' needed here as validatedWeatherCondition is guaranteed valid.
  const currentAnimationConfig = BoatAnimationConfig[weatherParam];

  async function BoatAnimation() {
    const dropIN = animate(
      scope.current,
      { y: 0, opacity: 1 },
      {
        type: "spring", // Use spring for the y movement
        stiffness: 70, // Adjust stiffness for desired "splash" impact
        damping: 7,   // Adjust damping for how quickly it settles
        mass: 1,       // Adjust mass
      }
    )

    const stabilize = await animate(
      scope.current,
      { rotate: 0 }, // Tilts down, overshoots, then settles at 0 degrees
      {
        type: "spring",
        stiffness: 40, // Softer spring for rotation
        damping: 10,
        mass: 0.5,
        delay: 0.2,
      }
    )

    await Promise.all([dropIN, stabilize])

    animate( // No 'await' here, as this is the final, continuous animation
      scope.current,
      {
        /* 
          1. Tilt down, drop a little
          2. move forward and drop more, ease up on tilt
          3.level tilt, less forward, come up a little
        */
        y: [0, currentAnimationConfig.amplitude, currentAnimationConfig.amplitude / 4, 0],
        rotate: [0, currentAnimationConfig.rotation, currentAnimationConfig.rotation / -1, 0]
      },
      {
        duration: currentAnimationConfig.length,               // Increased duration for smoother movement
        repeat: Infinity,
        ease: "easeInOut"          // CRITICAL: Use easeInOut for fluid, natural motion
      }
    );
  }

  useEffect(() => {
    BoatAnimation();
  }, [searchParams, animate, scope]);

  return (
    <div className="boat-container" >
      <motion.img
        ref={scope}
        className="boat-image"
        src="/NewBoat.png"
        alt="Ship with all my treasure"
        initial={{ y: -150, opacity: 0, rotate: -15 }} // Start from above and faded 
        whileHover={{ scale: 1.05 }}
      />
    </div>
  )
}