import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import type { FavoritesProps } from '../types/favoritesProps';

export default function Favorites({ onCityClick }: FavoritesProps) {
  const favorites = useSelector((state: RootState) => state.ui.favorites);

  if (favorites.length === 0) return null;

  return (
    <div className="flex gap-2 mt-2 overflow-x-auto px-2">
      {favorites.map((f) => (
        <button
          key={f.name}
          onClick={() => onCityClick(f.name)}
          className="bg-white text-black px-3 py-1 rounded-full hover:bg-gray-200 cursor-pointer transition whitespace-nowrap"
        >
          {f.name}
        </button>
      ))}
    </div>
  );
}
