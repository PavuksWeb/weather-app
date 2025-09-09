import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { toggleUnit } from '../store/uiSlice';

interface SearchInputProps {
  query: string;
  setQuery: (value: string) => void;
  onSearch: (city?: string) => void;
  isLoading: boolean;
  showHistory: boolean;
  setShowHistory: (show: boolean) => void;
}

export default function SearchInput({
  query,
  setQuery,
  onSearch,
  isLoading,
  setShowHistory,
}: SearchInputProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const units = useSelector((state: RootState) => state.ui.units);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowHistory(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowHistory]);

  return (
    <div
      ref={wrapperRef}
      className="flex justify-center items-center gap-4 mt-40 mb-2 relative"
    >
      <input
        type="text"
        name="city"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowHistory(true)}
        className="bg-white rounded-3xl py-2 px-6 disabled:cursor-not-allowed"
        disabled={isLoading}
      />
      <button
        onClick={() => onSearch()}
        className="bg-white p-2 rounded-4xl hover:cursor-pointer hover:bg-gray-200 transition duration-500 hover:scale-105 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        <img src="/search.svg" alt="Search" />
      </button>
      <button
        onClick={() => dispatch(toggleUnit())}
        className="bg-white px-4 py-2 rounded-3xl text-sm font-medium hover:bg-gray-200 duration-500 hover:scale-105 cursor-pointer transition"
      >
        {units === 'metric' ? '°C' : '°F'}
      </button>
    </div>
  );
}
