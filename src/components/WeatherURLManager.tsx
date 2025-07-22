"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  updateWebsiteWeather,
  WEATHER_STATES,
  WeatherCondition,
} from "rt/utils/weather-utils";

/**
 * WeatherURLManager component is responsible for:
 * 1. Reading the initial weather condition from the URL.
 * 2. Updating the website's body class based on the current weather.
 * 3. Cycling through weather conditions at a set interval.
 * 4. Updating the URL's 'weather' search parameter to reflect the current condition,
 * which in turn drives other components (like boat and waves) that read from the URL.
 *
 * This component renders nothing visually (returns null).
 * It acts as a controller for the application's weather state via the URL.
 */
export default function WeatherURLManager() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // useEffect hook to manage the weather cycling interval and URL updates.
  // This effect runs on component mount and whenever 'router' or 'searchParams' dependencies change.
  useEffect(() => {
    // Determine the initial weather condition based on the URL or default to 'sunny'.
    let currentURLWeather =
      (searchParams.get("weather") as WeatherCondition) || WEATHER_STATES[0];

    // Apply the initial weather condition to the website's body class.
    updateWebsiteWeather(currentURLWeather);

    // Find the starting index for the weather cycle.
    // If the current URL weather isn't found in WEATHER_STATES (e.g., invalid param), default to index 0.
    let currentIndex = WEATHER_STATES.indexOf(currentURLWeather);
    if (currentIndex === -1) {
      currentIndex = 0;
    }

    // Set up an interval to periodically change the weather condition.
    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % WEATHER_STATES.length;
      const nextCondition = WEATHER_STATES[currentIndex];

      // Update the website's body class for the new weather condition.
      updateWebsiteWeather(nextCondition);

      // Create a new URLSearchParams object based on the current URL's parameters.
      const newSearchParams = new URLSearchParams(searchParams.toString());
      // Set or update the 'weather' parameter with the next condition.
      newSearchParams.set("weather", nextCondition);

      // Update the browser's URL with the new search parameters.
      // `scroll: false` prevents the page from jumping to the top on URL update.
      router.push(`?${newSearchParams.toString()}`, { scroll: false });
    }, 5000);

    // Cleanup function: This runs when the component unmounts or before the
    // useEffect re-runs due to a dependency change.
    return () => clearInterval(intervalId);
  }, [router, searchParams]);

  // This component does not render any visible UI elements.
  return null;
}
