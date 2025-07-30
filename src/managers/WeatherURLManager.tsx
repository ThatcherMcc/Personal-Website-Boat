"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { updateWebsiteWeather, WeatherCondition } from "rt/utils/weather-utils";

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
    const locationDetails: LocationDetailsTuple = ["McKinney", "TX", "1"];

    const manageWeatherAndURL = async () => {
      try {
        const weatherID = await getCurrentWeatherID(locationDetails);
        const nextWeatherCondition = getWeatherTypeByID(weatherID);
        console.log(weatherID);
        console.log(nextWeatherCondition);
        // Apply the initial weather condition to the website's body class.
        updateWebsiteWeather(nextWeatherCondition);
        // Create a new URLSearchParams object based on the current URL's parameters.
        const newSearchParams = new URLSearchParams(searchParams.toString());
        // Set or update the 'weather' parameter with the next condition.
        newSearchParams.set("weather", nextWeatherCondition);
        router.push(`?${newSearchParams}`, { scroll: false });
      } catch (error) {
        console.error("Error managing weather and URL:", error);
      }
    };

    manageWeatherAndURL();

    const intervalId = setInterval(() => {
      manageWeatherAndURL();
    }, 600000); // Set to repeat every 10 minutes

    // Cleanup function: This runs when the component unmounts or before the
    // useEffect re-runs due to a dependency change.
    return () => clearInterval(intervalId);
  }, [router, searchParams]);

  // This component does not render any visible UI elements.
  return null;
}

function isNumberBetween(num: number, low: number, high: number): boolean {
  return low <= num && high >= num;
}

function getWeatherTypeByID(id: number): WeatherCondition {
  if (isNumberBetween(id, 200, 232)) {
    // Thunderstorm
    return "stormy";
  } else if (isNumberBetween(id, 300, 321)) {
    // Drizzle
    return "rainy";
  } else if (isNumberBetween(id, 500, 531)) {
    // Rain
    return "rainy";
  } else if (isNumberBetween(id, 600, 622)) {
    // Snow (WIP Weather Condition)
    return "rainy";
  } else if (isNumberBetween(id, 701, 781)) {
    // Atmosphere (e.g. Tornado, Sand, Mist)
    // May add a mist weather condition but otherwise I hope my boat doesnt see a tornado lol.
    return "sunny";
  } else if (isNumberBetween(id, 803, 804)) {
    // Clouds
    return "cloudy";
  } else {
    // Sunny skies as default
    return "sunny";
  }
}

type LocationDetailsTuple = [string, string, string];

async function getCurrentWeatherID(
  locationDetails: LocationDetailsTuple
): Promise<number> {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
  const [city, stateCode, countryCode] = locationDetails;

  if (!apiKey) {
    console.error(
      "No API Key found. lease define NEXT_PUBLIC_OPENWEATHER_API_KEY in your .env.local file. "
    );
    return 800;
  }

  const response = await fetch(
    `${baseURL}${city},${stateCode},${countryCode}&appid=${apiKey}`
  );

  if (!response.ok) {
    console.error(`HTTP error! Status: ${response.status}`);
    return 801;
  }

  const data = await response.json();
  return data.weather[0].id;
}
