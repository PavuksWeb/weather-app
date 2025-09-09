import { useSelector } from 'react-redux';
import type { RootState } from '../store';

interface SearchHistoryProps {
  query: string;
  onSearch: (city?: string) => void;
}

export default function SearchHistory({ query, onSearch }: SearchHistoryProps) {
  const history = useSelector((state: RootState) => state.ui.history);

  return (
    <ul className="bg-white shadow-lg rounded-lg max-h-48 absolute top-full left-0 w-full z-50">
      {history
        .filter((h) => h.name.toLowerCase().startsWith(query.toLowerCase()))
        .map((h) => (
          <li
            key={h.name}
            className="px-4 py-2 hover:bg-gray-200 rounded-lg hover:cursor-pointer"
            onMouseDown={() => onSearch(h.name)}
          >
            {h.name}
          </li>
        ))}
    </ul>
  );
}
