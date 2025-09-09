import type { WeatherResponse } from '../types/data';

export default async function getWeather(
  city: string,
  units: string
): Promise<WeatherResponse> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}${city}${
      import.meta.env.VITE_API_UNITS
    }${units}${import.meta.env.VITE_API_KEY}`
  );

  if (!res.ok) throw new Error('Request failed');

  return res.json();
}
