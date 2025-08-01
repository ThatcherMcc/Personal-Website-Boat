"use client";

import Wave from "react-wavify";
import { motion } from "framer-motion";
import { WEATHER_WAVE_CONFIGS } from "rt/configs/weather-wave-configs";
import { BoatRoom } from "rt/managers/BoatURLManager";
import { WeatherCondition } from "rt/utils/weather-utils";

/**
 * @typedef {object} WaveBackgroundProps
 * @property {object} searchParams - The URL search parameters object from Next.js.
 */
type WaveBackgroundProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

/**
 * WaveBackground component renders animated ocean waves whose properties
 * (like fill color and wave options) are determined by the 'weather'
 * parameter in the URL search parameters.
 *
 * @param {WaveBackgroundProps} props - The component props containing URL search parameters.
 * @returns {JSX.Element} A set of layered Wave components representing the ocean background.
 */
export default function WaveBackground({ searchParams }: WaveBackgroundProps) {
  // Retrieves the 'weather' parameter from the URl.
  const weatherParam = searchParams.weather as WeatherCondition;
  const boatRoom = searchParams.room as BoatRoom;

  // Gets and sets current boat animation to its respective weather condition.
  // Default to "WEATHER_WAVE_CONFIGS.sunny" if the weatherParam is undefined.
  const currentWaveConfig =
    WEATHER_WAVE_CONFIGS[weatherParam] || WEATHER_WAVE_CONFIGS.sunny;

  return (
    <motion.div
      animate={{ "--wave-bottom": boatRoom ? "-175px" : "0px" }}
      transition={{ duration: 1.3, ease: "easeInOut" }}
    >
      {/* Backmost layer of the ocean waves (lowest z-index) */}
      <div
        id="back-wave-container"
        className="wave-layer-container"
        style={{ zIndex: 1 }}
      >
        <Wave
          fill={currentWaveConfig.fill[0]}
          paused={false}
          style={{}}
          options={
            boatRoom
              ? WEATHER_WAVE_CONFIGS.zoomed.options[0]
              : currentWaveConfig.options[0]
          }
        />
      </div>

      {/* Middle layer of the ocean waves (behind boat) */}
      <div
        id="middle-wave-container-back"
        className="wave-layer-container"
        style={{ zIndex: 2 }}
      >
        <Wave
          fill={currentWaveConfig.fill[1]}
          paused={false}
          style={{}}
          options={
            boatRoom
              ? WEATHER_WAVE_CONFIGS.zoomed.options[1]
              : currentWaveConfig.options[1]
          }
        />
      </div>

      {/* Middle layer of the ocean waves (in-front of boat) */}
      <div
        id="middle-wave-container-front"
        className="wave-layer-container"
        style={{ zIndex: 4 }}
      >
        <Wave
          fill={currentWaveConfig.fill[1]}
          paused={false}
          style={{}}
          options={
            boatRoom
              ? WEATHER_WAVE_CONFIGS.zoomed.options[1]
              : currentWaveConfig.options[1]
          }
        />
      </div>

      {/* Frontmost layer of the ocean waves (highest z-index, closest to viewer) */}
      <div
        id="front-wave-container"
        className="wave-layer-container"
        style={{ zIndex: 5 }}
      >
        <Wave
          fill={currentWaveConfig.fill[2]}
          paused={false}
          style={{}}
          options={
            boatRoom
              ? WEATHER_WAVE_CONFIGS.zoomed.options[2]
              : currentWaveConfig.options[2]
          }
        />
      </div>
    </motion.div>
  );
}
