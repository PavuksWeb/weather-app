import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UIState } from '../types/uiState';
import type { SearchItem } from '../types/searchItem';

function loadHistory(): SearchItem[] {
  const raw = localStorage.getItem('searchHistory');
  if (!raw) return [];

  const parsed: SearchItem[] = JSON.parse(raw);

  return parsed.filter(
    (h) => Date.now() - h.timestamp < import.meta.env.VITE_TTL
  );
}

const initialState: UIState = {
  history: loadHistory(),
  favorites: [],
  lastCities: [],
  units: 'metric',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addToHistory(state, action: PayloadAction<string>) {
      const item: SearchItem = { name: action.payload, timestamp: Date.now() };

      state.history = [
        item,
        ...state.history.filter((h) => h.name !== action.payload),
      ].slice(0, 10);

      localStorage.setItem('searchHistory', JSON.stringify(state.history));
    },
    clearExpiredHistory: (state) => {
      state.history = state.history.filter(
        (h) => Date.now() - h.timestamp < import.meta.env.VITE_TTL
      );
      localStorage.setItem('searchHistory', JSON.stringify(state.history));
    },
    addToFavorites(state, action: PayloadAction<string>) {
      const city = { name: action.payload };
      if (!state.favorites.some((c) => c.name === city.name)) {
        state.favorites.push(city);
      }
    },
    removeFromFavorites(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter(
        (c) => c.name !== action.payload
      );
    },
    addLastCity(state, action: PayloadAction<string>) {
      const city = { name: action.payload };
      state.lastCities = [
        city,
        ...state.lastCities.filter((c) => c.name !== city.name),
      ];
      if (state.lastCities.length > 10) state.lastCities.pop();
    },
    toggleUnit: (state) => {
      state.units = state.units === 'metric' ? 'imperial' : 'metric';
    },
  },
});

export const {
  addToHistory,
  addToFavorites,
  removeFromFavorites,
  clearExpiredHistory,
  addLastCity,
  toggleUnit,
} = uiSlice.actions;

export default uiSlice.reducer;
