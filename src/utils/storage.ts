export interface SearchItem {
  city: string;
  expiry: number;
}

export function saveSearchHistory(history: SearchItem[]) {
  localStorage.setItem('searchHistory', JSON.stringify(history));
}

export function loadSearchHistory(): SearchItem[] {
  const raw = localStorage.getItem('searchHistory');
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as SearchItem[];
    const now = Date.now();
    return parsed.filter((item) => item.expiry > now);
  } catch {
    return [];
  }
}
