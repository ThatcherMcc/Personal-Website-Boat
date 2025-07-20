// src/contexts/WeatherContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { WEATHER_WAVE_CONFIGS, WeatherWaveConfig } from 'rt/configs/weatherWaveConfigs';
import { BoatAnimationConfig, BoatAnimationOptions } from 'rt/configs/boatConfigs';
// Import WeatherCondition and WEATHER_STATES from weatherUtils
import { WEATHER_STATES, WeatherCondition, updateWebsiteWeather as updateBodyWeatherClass } from 'rt/utils/weatherUtils';

// Define the shape of our context's value
interface WeatherContextType {
  currentWaveConfig: WeatherWaveConfig;
  currentBoatConfig: BoatAnimationOptions;
  currentWeatherCondition: WeatherCondition; // Use the specific WeatherCondition type here
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

// Create a provider component
interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider = ({ children }: WeatherProviderProps) => {
  // Initialize state with the explicit WeatherCondition type
  const [currentWeatherCondition, setCurrentWeatherCondition] = useState<WeatherCondition>(WEATHER_STATES[0]);
  const [currentWaveConfig, setCurrentWaveConfig] = useState<WeatherWaveConfig>(WEATHER_WAVE_CONFIGS.sunny);
  const [currentBoatConfig, setCurrentBoatConfig] = useState<BoatAnimationOptions>(BoatAnimationConfig.sunny);

  useEffect(() => {
    // Set initial weather
    const initialCondition = WEATHER_STATES[0]; // This is now correctly typed as WeatherCondition
    const initialWaveConfig = updateBodyWeatherClass(initialCondition);
    setCurrentWaveConfig(initialWaveConfig);
    setCurrentBoatConfig(BoatAnimationConfig[initialCondition]);
    setCurrentWeatherCondition(initialCondition); // This assignment is now type-safe

    let currentIndex = 0;

    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % WEATHER_STATES.length;
      const nextCondition = WEATHER_STATES[currentIndex]; // This is also correctly typed

      const nextWaveConfig = updateBodyWeatherClass(nextCondition);
      setCurrentWaveConfig(nextWaveConfig);

      setCurrentBoatConfig(BoatAnimationConfig[nextCondition]);
      setCurrentWeatherCondition(nextCondition); // And this assignment is type-safe
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const contextValue = {
    currentWaveConfig,
    currentBoatConfig,
    currentWeatherCondition,
  };

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};

// Custom hook to use the weather context
export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};