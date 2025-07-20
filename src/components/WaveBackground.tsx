// src/components/WeatherUpdater.tsx

'use client';

import { useEffect, useState } from 'react'; // Import useState too
import Wave from 'react-wavify';
import { useWeather } from 'rt/components/WeatherProvider';


// --- The WeatherUpdater React Component ---
// This component now takes a prop (setWaveProps) to update the parent's state
export default function WaveBackground() {
  
  const { currentWaveConfig } = useWeather();

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
          className="ocean-wave"
          fill={currentWaveConfig.fill[1]}
          paused={false}
          style={{}}
          options={currentWaveConfig.options[1]}
        />
      </div>
      <div id='middle-wave-container-front' className='wave-layer-container' style={{ zIndex: 4}}>
        <Wave
          className="ocean-wave"
          fill={currentWaveConfig.fill[1]}
          paused={false}
          style={{}}
          options={currentWaveConfig.options[1]}
        />
      </div>

      <div id='front-wave-container' className='wave-layer-container' style={{ zIndex: 5}}>
        <Wave
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