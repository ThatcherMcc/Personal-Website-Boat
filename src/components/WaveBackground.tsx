import Wave from 'react-wavify';
import { WEATHER_WAVE_CONFIGS } from 'rt/configs/weatherWaveConfigs';
import { WeatherCondition } from 'rt/utils/weatherUtils';

type WaveBackgroundProps = {
  searchParams: { [key: string]: string | string[] | undefined};
}
// --- The WeatherUpdater React Component ---
// This component now takes a prop (setWaveProps) to update the parent's state
export default function WaveBackground({searchParams} : WaveBackgroundProps) {
  const weatherParam = searchParams.weather as WeatherCondition;
  const currentWaveConfig = WEATHER_WAVE_CONFIGS[weatherParam] || WEATHER_WAVE_CONFIGS.sunny;
  
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