import { useQuery } from '@tanstack/react-query';
import getWeather from '../services/weatherResponse';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export default function useWeather(city: string) {
  const query = city.trim().toLocaleLowerCase();
  const units = useSelector((state: RootState) => state.ui.units);

  return useQuery({
    queryKey: ['city', query, units],
    queryFn: async () => getWeather(query, units),
    enabled: !!city,
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
