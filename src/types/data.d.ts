import type { Coord } from './coorsd';
import type { Main } from './main';
import type { Sys } from './sys';
import type { Weather } from './weather';
import type { Wind } from './wind';

export interface WeatherResponse {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  rain?: {
    '1h'?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
