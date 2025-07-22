import Wave from "react-wavify";
import { WEATHER_WAVE_CONFIGS } from "rt/configs/weather-wave-configs";
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

  // Gets and sets current boat animation to its respective weather condition.
  // Default to "WEATHER_WAVE_CONFIGS.sunny" if the weatherParam is undefined.
  const currentWaveConfig =
    WEATHER_WAVE_CONFIGS[weatherParam] || WEATHER_WAVE_CONFIGS.sunny;

  return (
    <>
      {/* Backmost layer of the ocean waves (lowest z-index) */}
      <div
        id="back-wave-container"
        className="wave-layer-container"
        style={{ zIndex: 1 }}
      >
        <Wave
          id="back-ocean-wave"
          className="ocean-wave"
          fill={currentWaveConfig.fill[0]}
          paused={false}
          style={{}}
          options={currentWaveConfig.options[0]}
        />
      </div>

      {/* Middle layer of the ocean waves (behind boat) */}
      <div
        id="middle-wave-container-back"
        className="wave-layer-container"
        style={{ zIndex: 2 }}
      >
        <Wave
          className="ocean-wave"
          fill={currentWaveConfig.fill[1]}
          paused={false}
          style={{}}
          options={currentWaveConfig.options[1]}
        />
      </div>
      {/* Middle layer of the ocean waves (in-front of boat) */}
      <div
        id="middle-wave-container-front"
        className="wave-layer-container"
        style={{ zIndex: 4 }}
      >
        <Wave
          className="ocean-wave"
          fill={currentWaveConfig.fill[1]}
          paused={false}
          style={{}}
          options={currentWaveConfig.options[1]}
        />
      </div>

      {/* Frontmost layer of the ocean waves (highest z-index, closest to viewer) */}
      <div
        id="front-wave-container"
        className="wave-layer-container"
        style={{ zIndex: 5 }}
      >
        <Wave
          className="ocean-wave"
          fill={currentWaveConfig.fill[2]}
          paused={false}
          style={{}}
          options={currentWaveConfig.options[2]}
        />
      </div>
    </>
  );
}
