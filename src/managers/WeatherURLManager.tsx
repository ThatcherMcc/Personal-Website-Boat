"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { updateWebsiteWeather, WeatherCondition } from "rt/utils/weather-utils";

/**
 * Tuple holding the City code, State code, and Country code
 * for the location to be used.
 */
type LocationDetailsTuple = [string, string, string];
export const locationDetails: LocationDetailsTuple = ["Wichita", "KS", "1"];

export type WeatherDataTuple = [string, number, number, number];
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
    // Determine the initial weather condition based on the URL or default to 'sunny'
    const manageWeatherAndURL = async () => {
      try {
        const weather = await getCurrentWeather(locationDetails);
        const nextWeatherCondition = getWeatherTypeByID(weather.id);

        // Apply the initial weather condition to the website's body class.
        updateWebsiteWeather(nextWeatherCondition);
        // Create a new URLSearchParams object based on the current URL's parameters.
        const newSearchParams = new URLSearchParams(searchParams.toString());
        // Set or update the 'weather' parameter with the next condition.
        newSearchParams.set("weather", nextWeatherCondition);
        router.push(`?${newSearchParams}`, { scroll: false });

        const weatherDataTuple: WeatherDataTuple = [
          weather.description,
          weather.temp,
          weather.temp_min,
          weather.temp_max,
        ];

        window.dispatchEvent(
          new CustomEvent("weatherUpdated", { detail: weatherDataTuple })
        );
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

type WeatherAPIResponse = {
  id: number;
  description: string;
  temp: number;
  temp_min: number;
  temp_max: number;
};

async function getCurrentWeather(
  locationDetails: LocationDetailsTuple
): Promise<WeatherAPIResponse> {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
  const [city, stateCode, countryCode] = locationDetails;

  if (!apiKey) {
    console.error(
      "No API Key found. lease define NEXT_PUBLIC_OPENWEATHER_API_KEY in your .env.local file. "
    );
    return {
      id: 800,
      description: "clear sky",
      temp: 75,
      temp_min: 70,
      temp_max: 80,
    };
  }

  const response = await fetch(
    `${baseURL}${city},${stateCode},${countryCode}&appid=${apiKey}&units=imperial`
  );

  if (!response.ok) {
    console.error(`HTTP error! Status: ${response.status}`);
    return {
      id: 800,
      description: "clear sky",
      temp: 75,
      temp_min: 70,
      temp_max: 80,
    };
  }

  const data = await response.json();
  return {
    id: data.weather[0].id,
    description: data.weather[0].description,
    temp: Math.round(data.main.temp),
    temp_min: Math.round(data.main.temp_min),
    temp_max: Math.round(data.main.temp_max),
  };
}
