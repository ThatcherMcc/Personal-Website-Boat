// src/components/WeatherUpdater.tsx

'use client';

import { useEffect, useState } from 'react'; // Import useState too
import Wave from 'react-wavify';

interface WaveOptionsConfig {
  height: number;
  amplitude: number;
  speed: number;
  points: number;
}

interface WeatherWaveConfig {
  fill: string[];
  options: WaveOptionsConfig[]; // Note: This is now a single object, not an array
}

interface AllWeatherWaveConfig {
  sunny: WeatherWaveConfig;
  cloudy: WeatherWaveConfig;
  rainy: WeatherWaveConfig;
  stormy: WeatherWaveConfig;
}

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

const WEATHER_WAVE_CONFIGS: AllWeatherWaveConfig = {
  sunny: {
    fill: [
      'rgba(0, 50, 100, 1)',
      'rgba(0, 80, 150, 1)',
      'rgba(0, 110, 200, 1)'
    ],
    options: [
      { height: 100, amplitude: 15, speed: -0.05, points: 3 },
      { height: 100, amplitude: 20, speed: -0.10, points: 4 }, 
      { height: 100, amplitude: 25, speed: -0.15, points: 5 } 
    ]
  },
  cloudy: {
    fill: [
      'rgba(0, 40, 80, 1)',
      'rgba(0, 60, 120, 1)',
      'rgba(0, 90, 160, 1)'
    ],
    options: [ 
      { height: 100, amplitude: 15, speed: -0.1, points: 4 },
      { height: 100, amplitude: 20, speed: -0.12, points: 5 },
      { height: 100, amplitude: 25, speed: -0.18, points: 5 }
    ]
  },
  rainy: {
    fill: [
      'rgba(0, 15, 30, 1)',   // **Back: Much darker, almost black-blue**
      'rgba(0, 25, 50, 1)',   // **Middle: Slightly lighter, very dark blue**
      'rgba(0, 35, 70, 1)'
    ],
    options: [
      { height: 90, amplitude: 25, speed: -0.15, points: 6 },
      { height: 95, amplitude: 30, speed: -0.18, points: 6 },
      { height: 100, amplitude: 33, speed: -0.23, points: 8 }
    ]
  },
  stormy: {
    fill: [
      'rgba(0, 10, 20, 1)',    // Back: Even darker than rainy back, very close to black
      'rgba(0, 15, 30, 1)',    // Middle: Slightly distinguishable
      'rgba(0, 20, 40, 1)'
    ],
    options: [ 
      { height: 85, amplitude: 25, speed: -0.3, points: 8 },
      { height: 95, amplitude: 30, speed: -0.33, points: 10 },
      { height: 100, amplitude: 25, speed: -0.35, points: 12 }
    ]
  }
}



// --- The WeatherUpdater React Component ---
// This component now takes a prop (setWaveProps) to update the parent's state
export default function WaveBackground() {
  
  const [currentWaveConfig, setCurrentWaveConfig] = useState<WeatherWaveConfig>(
    WEATHER_WAVE_CONFIGS.sunny // Initialize with sunny weather properties
  );
  useEffect(() => {

    const weatherStates: (keyof AllWeatherWaveConfig)[] = ['sunny','cloudy','rainy','stormy'];
    let currentIndex = 0; 

    const updateWeather = (condition : keyof AllWeatherWaveConfig) => {
      removeBodyWeatherClasses(); // Clears previous weather classes from <body>.
      document.body.classList.add(`weather-${condition}`); // Adds the new weather class to <body>.

      setCurrentWaveConfig(WEATHER_WAVE_CONFIGS[condition]);
      console.log(`Website weather set to: ${condition}`);
    };

    // Apply initial weather when component mounts
    updateWeather(weatherStates[currentIndex]);

    // Set up an interval to change weather every 5 seconds
    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % weatherStates.length;
      updateWeather(weatherStates[currentIndex]);
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

      <div id='middle-wave-container' className='wave-layer-container' style={{ zIndex: 2}}>
        <Wave
          id="middle-ocean-wave"
          className="ocean-wave"
          fill={currentWaveConfig.fill[1]}
          paused={false}
          style={{}}
          options={currentWaveConfig.options[1]}
        />
      </div>

      <div id='front-wave-container' className='wave-layer-container' style={{ zIndex: 3}}>
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