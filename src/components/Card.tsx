import type { CurrentWeather } from '../types/currentWeather';
import wind_icon from '/wind.png?url';
import humidity_icon from '/humidity.png?url';
import { getWeatherTheme } from '../utils/getWeatherTheme';
import WeatherIcon from './WeatherIcon';
import { addToFavorites, removeFromFavorites } from '../store/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';

export default function Card({
  city,
  temperature,
  icon,
  humidity,
  windSpeed,
}: CurrentWeather) {
  const theme = getWeatherTheme(icon || 'Clear');

  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.ui.favorites);
  const units = useSelector((state: RootState) => state.ui.units);

  const isFavorite = favorites.some((c) => c.name === city);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(city));
    } else {
      dispatch(addToFavorites(city));
    }
  };

  return (
    <main
      className={`relative bg-white px-6 pb-10 pt-2 rounded-xl shadow-md flex flex-col gap-2 justify-center items-center font-[Inter] transition duration-700 hover:scale-105 ${theme.bgClass} ${theme.textClass}`}
    >
      <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 p-2 z-30 rounded-full hover:cursor-pointer transition"
      >
        <img src={isFavorite ? '../star.png' : 'hollow-star.png'} />
      </button>
      <WeatherIcon condition={icon || 'Clear'} className="h-50 w-50" />
      <div className="flex flex-col gap-2 justify-center items-center text-4xl">
        <p className="font-medium">
          {temperature}
          {units === 'metric' ? '°c' : '°f'}
        </p>
        <p>{city}</p>
      </div>
      <div className="flex justify-between mt-8 gap-12">
        <div className="flex gap-3">
          <img src={humidity_icon} />
          <div className="flex flex-col">
            <span>Humidity</span>
            <p>{humidity} %</p>
          </div>
        </div>
        <div className="flex gap-3">
          <img src={wind_icon} />
          <div className="flex flex-col">
            <span>Wind</span>
            <p>
              {windSpeed} {units === 'metric' ? 'm/sec' : 'mi/h'}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
