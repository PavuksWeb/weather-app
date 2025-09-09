import type { City } from './city';
import type { SearchItem } from './searchItem';

export interface UIState {
  history: SearchItem[];
  favorites: City[];
  lastCities: City[];
  units: 'metric' | 'imperial';
}
