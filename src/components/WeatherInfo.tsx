"use client";
import { useEffect, useState } from "react";
import {
  locationDetails,
  WeatherDataTuple,
} from "rt/managers/WeatherURLManager";

/**
 * @property {object} searchParams - The URL search parameters object from Next.js.
 */
type WeatherInfoProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export default function WeatherInfo({ searchParams }: WeatherInfoProps) {
  const existsBoatRoom = !!searchParams.room;
  const weatherType = searchParams.weather;
  const [weatherData, setWeatherData] = useState<WeatherDataTuple | undefined>(
    undefined
  );

  useEffect(() => {
    const handleWeatherUpdate = (event: CustomEvent<WeatherDataTuple>) => {
      setWeatherData(event.detail);
    };

    window.addEventListener(
      "weatherUpdated",
      handleWeatherUpdate as EventListener
    );

    return () => {
      window.removeEventListener(
        "weatherUpdated",
        handleWeatherUpdate as EventListener
      );
    };
  }, []);

  const [city, state] = locationDetails;

  if (existsBoatRoom) {
    return null;
  }

  if (!weatherData) {
    return (
      <>
        <div className="weather-info-container">
          <img src={"/weather-icons/sunny.svg"} alt="Weather icon" />
          <span className="text-xl font-semibold">Loading...</span>
        </div>
      </>
    );
  }

  const [description, temperature, temp_min, temp_max] = weatherData;

  return (
    <>
      <div className="weather-info-container">
        <img
          src={`/weather-icons/${weatherType}.svg`}
          alt="Current Weather Icon"
        />
        <span className="text-xl font-semibold text-white">
          {city}, {state}
        </span>
      </div>
      <div className="weather-info-screen font-bold text-white">
        <p>{description.charAt(0).toUpperCase() + description.slice(1)}</p>
        <p>{temperature}°</p>
        <p>
          {temp_min}° - {temp_max}°
        </p>
      </div>
    </>
  );
}
