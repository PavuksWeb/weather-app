import type { CurrentWeather } from '../types/currentWeather';
import type { WeatherResponse } from '../types/data';

export function mapToCurrentWeather(data: WeatherResponse): CurrentWeather {
  return {
    city: data.name,
    temperature: Math.floor(data.main.temp),
    icon: data.weather[0].main,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
  };
}
