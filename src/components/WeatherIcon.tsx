import { weatherThemes } from '../theme/weatherThemes';
import type { WeatherIconProps } from '../types/weatherIconProps';

export default function WeatherIcon({
  condition,
  className,
}: WeatherIconProps) {
  const theme = weatherThemes[condition] ?? weatherThemes['Clear'];
  return <img src={theme.icon} className={className} alt={condition} />;
}
