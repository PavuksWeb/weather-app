import { useState, useEffect } from 'react';
import { saveSearchHistory, loadSearchHistory } from '../utils/storage';
import type { SearchItem } from '../utils/storage';

export function useSearchHistory() {
  const [searchHistory, setHistory] = useState<SearchItem[]>([]);

  useEffect(() => {
    setHistory(loadSearchHistory());
  }, []);

  const addToHistory = (city: string) => {
    const now = Date.now();
    const expiry = now + import.meta.env.VITE_TTL;

    const newHistory: SearchItem[] = [
      { city, expiry },
      ...searchHistory.filter(
        (h) => h.city.toLowerCase() !== city.toLowerCase()
      ),
    ].slice(0, 10);

    setHistory(newHistory);
    saveSearchHistory(newHistory);
  };

  return { searchHistory, addToHistory };
}
