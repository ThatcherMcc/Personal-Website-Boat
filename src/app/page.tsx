// src/app/page.tsx
// This is your main homepage content. The weather/ocean visuals are handled by CSS on the <body>.

import MyBoat from "rt/components/Boat";
import WaveBackground from "rt/components/WaveBackground";
import WeatherURLManager from "rt/components/WeatherURLManager";

export default async function HomePage({
  searchParams 
} : {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      <WeatherURLManager />
      <WaveBackground searchParams={await searchParams} />
      <MyBoat searchParams={await searchParams}/>
    </>
  );
}