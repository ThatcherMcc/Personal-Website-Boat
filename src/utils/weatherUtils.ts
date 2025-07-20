// IMPORT the configuration from the config file
import { WEATHER_WAVE_CONFIGS, AllWeatherWaveConfig, WeatherWaveConfig } from '../configs/weatherWaveConfigs';

export const WEATHER_STATES = ['sunny', 'cloudy', 'rainy', 'stormy'] as const;

export type WeatherCondition = typeof WEATHER_STATES[number];

// --- Helper to remove all weather classes (still applies to body for sky) ---
function removeBodyWeatherClasses() {
  const body = document.body;
  body.classList.remove(
    'weather-sunny',
    'weather-cloudy',
    'weather-rainy',
    'weather-stormy'
  );
}

// EXPORT the utility function
export const updateWebsiteWeather = (condition: WeatherCondition): WeatherWaveConfig => {
  removeBodyWeatherClasses();
  document.body.classList.add(`weather-${condition}`);
  return WEATHER_WAVE_CONFIGS[condition]; // Uses the imported config
};