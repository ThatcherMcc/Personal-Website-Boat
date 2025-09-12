"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  locationDetails,
  WeatherDataTuple,
} from "rt/managers/WeatherURLManager";
import { vw } from "motion";

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
          <div className="relative h-16 md:h-24 lg:h-36">
            <Image
              src={"/weather-icons/sunny.svg"}
              alt="Weather icon"
              fill={true}
              priority={true}
            />
          </div>
          <span className="text-sm md:text-md lg:text-xl font-semibold">
            Loading...
          </span>
        </div>
      </>
    );
  }

  const [description, temperature, temp_min, temp_max] = weatherData;

  return (
    <>
      <div className="weather-info-container">
        <div className="relative h-16 md:h-24 lg:h-36">
          <Image
            src={`/weather-icons/${weatherType}.svg`}
            alt="Current Weather Icon"
            fill={true}
            priority={true}
          />
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
