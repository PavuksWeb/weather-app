import { useEffect, useState } from 'react';
import Card from './components/Card';
import useWeather from './hooks/useWeather';
import Spinner from './components/Spinner';
import Empty from './components/Empty';
import SearchError from './components/SearchError';
import { useDebounce } from './hooks/useDebounce';
import type { CurrentWeather } from './types/currentWeather';
import { mapToCurrentWeather } from './utils/weatherMapper';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';
import {
  addLastCity,
  addToHistory,
  clearExpiredHistory,
} from './store/uiSlice';
import Favorites from './components/Favorites';
import SearchInput from './components/SearchBar';
import SearchHistory from './components/SearchHistory';

export default function App() {
  const [query, setQuery] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [showHistory, setShowHistory] = useState(false);

  const deboucedQuery = useDebounce(query, 500);
  const { data, isLoading, isError } = useWeather(city);

  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.ui.favorites);

  const currentWeather: CurrentWeather | null = data
    ? mapToCurrentWeather(data)
    : null;

  function handleSearch(c?: string) {
    const chosenCity = c ?? query;
    if (chosenCity.trim()) {
      setCity(chosenCity);
      dispatch(addToHistory(chosenCity));
      dispatch(addLastCity(chosenCity));
      setShowHistory(false);
      setQuery('');
    }
  }

  useEffect(() => {
    dispatch(clearExpiredHistory());
  }, [dispatch]);

  return (
    <div className="bg-linear-to-r from-cyan-300 to-blue-400 min-h-screen flex flex-col items-center justify-baseline gap-4">
      <div className="flex flex-col relative">
        <SearchInput
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
          isLoading={isLoading}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
        />

        {showHistory && query.length >= 2 && deboucedQuery && (
          <SearchHistory query={query} onSearch={handleSearch} />
        )}
      </div>

      {!showHistory && !city && <Empty />}
      {city && isLoading && <Spinner />}
      {city && isError && <SearchError />}
      {city && data && currentWeather?.city && (
        <Card {...(currentWeather as CurrentWeather)} />
      )}

      {favorites.length > 0 && <Favorites onCityClick={handleSearch} />}
    </div>
  );
}
