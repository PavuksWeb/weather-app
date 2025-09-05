import { useQuery } from '@tanstack/react-query';

export default function useWeather(city: string) {
  return useQuery({
    queryKey: ['city', city],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}${city}${import.meta.env.VITE_API_KEY}`
      );
      if (!res.ok) throw new Error('Request failed');
      return res.json();
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
