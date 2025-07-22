/**
 * @file Defines animation and visual configurations for ocean waves based on different weather conditions.
 * This file centralizes the properties that control the appearance and movement of the waves.
 */

/**
 * @property {number} height - The base height of the wave in pixels.
 * @property {number} amplitude - The wave's vertical change from its base height.
 * @property {number} speed - The speed the wave moves horizontally.
 * @property {number} points - The number of points used to render the wave curve.
 */
export type WaveOptionsConfig = {
  height: number;
  amplitude: number;
  speed: number;
  points: number;
};

/**
 * @property {string[]} fill - An array of RGBA color strings, used for the fill color of different wave layers (e.g., background, middle, foreground).
 * @property {WaveOptionsConfig[]} options - An array of "WaveOptionsConfig" objects, where each object corresponds to the animation properties for a specific wave layer.
 */
export type WeatherWaveConfig = {
  fill: string[];
  options: WaveOptionsConfig[]; // Note: This is now a single object, not an array
};

/**
 * A type that defines the structure for all supported weather conditions,
 * mapping each condition (e.g., 'sunny', 'cloudy') to its specific "WeatherWaveConfig".
 */
export type AllWeatherWaveConfig = {
  sunny: WeatherWaveConfig;
  cloudy: WeatherWaveConfig;
  rainy: WeatherWaveConfig;
  stormy: WeatherWaveConfig;
};

/**
 * A global constant object that provides a set of wave configurations
 * for various weather conditions. This object is used by the "WaveBackground" component
 * to adjust the ocean's appearance based on the current weather state.
 */
export const WEATHER_WAVE_CONFIGS: AllWeatherWaveConfig = {
  sunny: {
    fill: [
      "rgba(0, 50, 100, 1)",
      "rgba(0, 80, 150, 1)",
      "rgba(0, 110, 200, 1)",
    ],
    options: [
      { height: 100, amplitude: 15, speed: -0.05, points: 3 },
      { height: 100, amplitude: 20, speed: -0.1, points: 4 },
      { height: 100, amplitude: 25, speed: -0.15, points: 5 },
    ],
  },
  cloudy: {
    fill: ["rgba(0, 40, 80, 1)", "rgba(0, 60, 120, 1)", "rgba(0, 90, 160, 1)"],
    options: [
      { height: 100, amplitude: 15, speed: -0.1, points: 4 },
      { height: 100, amplitude: 20, speed: -0.12, points: 5 },
      { height: 100, amplitude: 25, speed: -0.18, points: 5 },
    ],
  },
  rainy: {
    fill: [
      "rgba(0, 15, 30, 1)", // **Back: Much darker, almost black-blue**
      "rgba(0, 25, 50, 1)", // **Middle: Slightly lighter, very dark blue**
      "rgba(0, 35, 70, 1)",
    ],
    options: [
      { height: 90, amplitude: 25, speed: -0.15, points: 6 },
      { height: 95, amplitude: 30, speed: -0.18, points: 6 },
      { height: 100, amplitude: 33, speed: -0.23, points: 8 },
    ],
  },
  stormy: {
    fill: [
      "rgba(0, 10, 20, 1)", // Back: Even darker than rainy back, very close to black
      "rgba(0, 15, 30, 1)", // Middle: Slightly distinguishable
      "rgba(0, 20, 40, 1)",
    ],
    options: [
      { height: 85, amplitude: 25, speed: -0.3, points: 8 },
      { height: 95, amplitude: 30, speed: -0.33, points: 10 },
      { height: 100, amplitude: 25, speed: -0.35, points: 12 },
    ],
  },
};
