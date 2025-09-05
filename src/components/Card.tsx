import clear_icon from '/clear.png?url';
import cloud_icon from '/cloud.png?url';
import drizzle_icon from '/drizzle.png?url';
import rain_icon from '/rain.png?url';
import snow_icon from '/snow.png?url';
import wind_icon from '/wind.png?url';
import humidity_icon from '/humidity.png?url';
import type { WeatherResponse } from '../types/data';

const weatherIcons: Record<string, string> = {
  Clear: clear_icon,
  Clouds: cloud_icon,
  Drizzle: drizzle_icon,
  Rain: rain_icon,
  Snow: snow_icon,
};

export default function Card(data: WeatherResponse) {
  const condition = data.weather?.[0]?.main || 'Clear';
  const icon = weatherIcons[condition] ?? clear_icon;

  return (
    <main className="bg-white px-6 pb-10 pt-2 rounded-xl shadow-md flex flex-col gap-2 justify-center items-center font-[Inter] transition duration-700 hover:scale-105">
      <img src={icon} className="h-50 w-50" />
      <div className="flex flex-col gap-2 justify-center items-center text-4xl">
        <p className="font-medium">{Math.floor(data.main.temp)}°c</p>
        <p>{data?.name}</p>
      </div>
      <div className="flex justify-between mt-8 gap-12">
        <div className="flex gap-3">
          <img src={humidity_icon} />
          <div className="flex flex-col">
            <span>Humidity</span>
            <p>{data.main.humidity} %</p>
          </div>
        </div>
        <div className="flex gap-3">
          <img src={wind_icon} />
          <div className="flex flex-col">
            <span>Wind</span>
            <p>{data.wind.speed} Km/h</p>
          </div>
        </div>
      </div>
    </main>
  );
}
