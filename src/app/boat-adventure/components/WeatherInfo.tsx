"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  locationDetails,
  WeatherDataTuple,
} from "rt/app/boat-adventure/managers/WeatherURLManager";

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
          <div className="h-16 md:h-24 lg:h-36 w-16 md:w-24 lg:w-36 rounded-full bg-white/30 animate-pulse" />
          <div className="h-3 md:h-4 w-20 md:w-28 bg-white/30 rounded-full animate-pulse mt-1" />
        </div>
        <div className="weather-info-screen">
          <div className="h-4 w-28 bg-white/20 rounded animate-pulse" />
          <div className="h-7 w-16 bg-white/20 rounded animate-pulse" />
          <div className="h-4 w-24 bg-white/20 rounded animate-pulse" />
        </div>
      </>
    );
  }

  const [description, temperature, temp_min, temp_max] = weatherData;

  return (
    <>
      <div className="weather-info-container">
        <div className="relative h-16 md:h-24 lg:h-36">
          {weatherType && typeof weatherType === 'string' && (
            <Image
              src={`/weather-icons/${weatherType}.svg`}
              alt="Current Weather Icon"
              fill={true}
              priority={true}
            />
          )}
        </div>
        <span className="text-sm md:text-md lg:text-xl font-semibold text-white">
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
