import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { AiOutlineSearch } from 'react-icons/ai';
import { useMovies } from '@contexts/movies/context';
import { useDebounce } from '@hooks/useDebounce';
import './SearchBar.css';

const SearchBar = () => {
  const { getMovies, setMovies } = useMovies();
  const [searchParams, setSearchParams] = useSearchParams();
  const [userTitle, setUserTitle] = useState<string>(searchParams.get('q')?.trim() ?? '');
  const [lastSearch, setLastSearch] = useState<string>('');
  const debouncedTitle = useDebounce(userTitle);

  const triggerSearch = (title: string) => {
    if (!title.trim()) {
      setMovies([]);
      setLastSearch('');
      setSearchParams({});

      return;
    }

    if (title !== lastSearch) {
      getMovies({ title });
      setLastSearch(title);
      setSearchParams({ q: title });
    }
  };

  useEffect(() => {
    triggerSearch(debouncedTitle);
  }, [debouncedTitle]);

  useEffect(() => {
    const currentQuery = searchParams.get('q') ?? '';
    if (!currentQuery.trim()) {
      setMovies([]);
      setUserTitle('');
      setLastSearch('');
    }
  }, [searchParams, setMovies]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        triggerSearch(userTitle);
      }}
      className="searchBar"
      data-testid="form">
      <AiOutlineSearch
        className="text-gray-400 text-2xl cursor-pointer"
        onClick={() => triggerSearch(userTitle)}
        data-testid="searchIcon"
      />
      <input
        type="text"
        value={userTitle}
        onChange={(e) => setUserTitle(e.target.value)}
        placeholder="Search movies"
        className="w-full outline-none text-lg"
      />
    </form>
  );
};

export default SearchBar;
