import { useState } from 'react';
import Card from './components/Card';
import useWeather from './hooks/useWeather';
import search_icon from '/search.svg?url';
import Spinner from './components/Spinner';

export default function App() {
  const [query, setQuery] = useState<string>('');
  const [city, setCity] = useState<string>('');

  const { data, isLoading, isError } = useWeather(city);
  console.log(data);

  function handleSearch() {
    setCity(query);
  }

  return (
    <div className="bg-linear-to-r from-cyan-300 to-blue-400 min-h-screen flex flex-col items-center justify-baseline">
      <div className="flex justify-center items-center gap-4 mt-40 mb-15">
        <input
          type="text"
          placeholder="Search"
          className="bg-white rounded-3xl py-2 px-6"
          value={query}
          onChange={(e) => {
            e.preventDefault();
            setQuery(e.target.value);
          }}
        />
        <button onClick={handleSearch}>
          <img
            src={search_icon}
            className="bg-white p-2 rounded-4xl hover:cursor-pointer hover:bg-gray-200 transition duration-500 hover:scale-105"
          />
        </button>
      </div>

      {!city && (
        <p className="text-4xl text-white mt-10">To start, enter city name</p>
      )}
      {city && isLoading && <Spinner />}
      {city && isError && <p>Searching failed</p>}
      {city && data && <Card {...data} />}
    </div>
  );
}
