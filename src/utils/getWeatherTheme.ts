import { weatherThemes } from '../theme/weatherThemes';

export function getWeatherTheme(condition: string) {
  return weatherThemes[condition] ?? weatherThemes['Clear'];
}
