import clear_icon from '/clear.png?url';
import cloud_icon from '/cloud.png?url';
import drizzle_icon from '/drizzle.png?url';
import rain_icon from '/rain.png?url';
import snow_icon from '/snow.png?url';
import type { WeatherTheme } from '../types/weatherTheme';

export const weatherThemes: Record<string, WeatherTheme> = {
  Clear: {
    icon: clear_icon,
    bgClass: 'bg-yellow-200',
    textClass: 'text-yellow-700',
  },
  Clouds: {
    icon: cloud_icon,
    bgClass: 'bg-gray-200',
    textClass: 'text-gray-700',
  },
  Drizzle: {
    icon: drizzle_icon,
    bgClass: 'bg-blue-100',
    textClass: 'text-blue-700',
  },
  Rain: { icon: rain_icon, bgClass: 'bg-blue-300', textClass: 'text-blue-800' },
  Snow: { icon: snow_icon, bgClass: 'bg-white', textClass: 'text-blue-300' },
};
