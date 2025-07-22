'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { updateWebsiteWeather, WEATHER_STATES, WeatherCondition } from "rt/utils/weatherUtils";

export default function WeatherURLManager() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {

    let currentURLWeather = searchParams.get('weather') as WeatherCondition || WEATHER_STATES[0];

    updateWebsiteWeather(currentURLWeather);

    let currentIndex = WEATHER_STATES.indexOf(currentURLWeather);
    if (currentIndex === -1) {
      currentIndex = 0;
    }

    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % WEATHER_STATES.length;
      const nextCondition = WEATHER_STATES[currentIndex];

      updateWebsiteWeather(nextCondition);

      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('weather', nextCondition);

      router.push(`?${newSearchParams.toString()}`, { scroll: false });

    }, 5000);

    return () => clearInterval(intervalId);

  }, [router, searchParams]);

  return null;
}