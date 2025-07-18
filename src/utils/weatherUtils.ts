// IMPORT the configuration from the config file
import { WEATHER_WAVE_CONFIGS, AllWeatherWaveConfig, WeatherWaveConfig } from '../configs/weatherWaveConfigs';

export const WEATHER_STATES: (keyof AllWeatherWaveConfig)[] = ['sunny', 'cloudy', 'rainy', 'stormy'];

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
export const updateWebsiteWeather = (condition: keyof AllWeatherWaveConfig): WeatherWaveConfig => {
  removeBodyWeatherClasses();
  document.body.classList.add(`weather-${condition}`);
  return WEATHER_WAVE_CONFIGS[condition]; // Uses the imported config
};