// src/components/WeatherUpdater.tsx

'use client';

import { useEffect, useState } from 'react'; // Import useState too
import Wave from 'react-wavify';
import { WEATHER_WAVE_CONFIGS, AllWeatherWaveConfig, WeatherWaveConfig } from 'rt/configs/weatherWaveConfigs';
import { updateWebsiteWeather, WEATHER_STATES } from 'rt/utils/weatherUtils';



// --- The WeatherUpdater React Component ---
// This component now takes a prop (setWaveProps) to update the parent's state
export default function WaveBackground() {
  
  const [currentWaveConfig, setCurrentWaveConfig] = useState<WeatherWaveConfig>(
    WEATHER_WAVE_CONFIGS.sunny // Initialize with sunny weather properties
  );

  useEffect(() => {

    const initalCondition = WEATHER_STATES[0];
    const initialConfig = updateWebsiteWeather(initalCondition);
    setCurrentWaveConfig(initialConfig);

    let currentIndex = 0; 

    // Set up an interval to change weather every 5 seconds
    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % WEATHER_STATES.length;
      const nextCondition = WEATHER_STATES[currentIndex];
      const nextConfig = updateWebsiteWeather(nextCondition);
      setCurrentWaveConfig(nextConfig);
    }, 5000); // Change every 5 seconds

    // Cleanup function
    return () => clearInterval(intervalId);
  }, []); // Add setWaveProps to dependency array

  return (
    <>
      <div id='back-wave-container' className='wave-layer-container' style={{ zIndex: 1}}>
        <Wave
          id='back-ocean-wave'
          className='ocean-wave'
          fill={currentWaveConfig.fill[0]} // Use state for fill color
          paused={false}
          style={{}}
          options={currentWaveConfig.options[0]} // Use state for wave options
        />
      </div>

      <div id='middle-wave-container-back' className='wave-layer-container' style={{ zIndex: 2}}>
        <Wave
          id="middle-ocean-wave"
          className="ocean-wave"
          fill={currentWaveConfig.fill[1]}
          paused={false}
          style={{}}
          options={currentWaveConfig.options[1]}
        />
      </div>
      <div id='middle-wave-container-front' className='wave-layer-container' style={{ zIndex: 4}}>
        <Wave
          id="middle-ocean-wave"
          className="ocean-wave"
          fill={currentWaveConfig.fill[1]}
          paused={false}
          style={{}}
          options={currentWaveConfig.options[1]}
        />
      </div>

      <div id='front-wave-container' className='wave-layer-container' style={{ zIndex: 5}}>
        <Wave
          id="front-ocean-wave"
          className="ocean-wave"
          fill={currentWaveConfig.fill[2]}
          paused={false}
          style={{}}
          options={currentWaveConfig.options[2]}
        />
      </div>
    </>
  )
}