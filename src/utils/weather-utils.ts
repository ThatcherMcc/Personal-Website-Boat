/**
 * @file Utility functions for managing weather-related states and effects across the application.
 * This file centralizes logic for updating the website's visual theme based on weather conditions.
 */

/**
 * @constant {ReadonlyArray<string>} WEATHER_STATES
 * A global constant array defining all supported weather conditions as literal strings.
 * The "as const" assertion ensures TypeScript infers these as specific literal types,
 * rather than just generic strings.
 */
export const WEATHER_STATES = ["sunny", "cloudy", "rainy", "stormy"] as const;

/**
 * @typedef {string} WeatherCondition
 * A type alias representing a union of all possible weather condition literal strings
 * derived from the "WEATHER_STATES" array.
 */
export type WeatherCondition = (typeof WEATHER_STATES)[number];

/**
 * Removes all 'weather-' prefixed classes from the document's body element.
 * This ensures that only the current weather class is active, preventing conflicts.
 */
function removeBodyWeatherClasses() {
  const body = document.body;
  body.classList.remove(
    "weather-sunny",
    "weather-cloudy",
    "weather-rainy",
    "weather-stormy"
  );
}

/**
 * Updates the website's visual weather theme by applying the corresponding CSS class to the body.
 * It also returns the relevant "WeatherWaveConfig" for the given condition,
 * allowing components to retrieve wave animation properties.
 *
 * @param {WeatherCondition} condition - The desired weather condition ('sunny', 'cloudy', 'rainy', 'stormy').
 */
export const updateWebsiteWeather = (condition: WeatherCondition): void => {
  removeBodyWeatherClasses();
  document.body.classList.add(`weather-${condition}`);
};
