import { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useMovies } from '@contexts/movies/context';
import { useDebounce } from '@hooks/useDebounce';
import './SearchBar.css';

const SearchBar = () => {
  const { getMovies, setMovies } = useMovies();
  const [userTitle, setUserTitle] = useState<string>('');
  const [lastSearch, setLastSearch] = useState<string>('');
  const debouncedTitle = useDebounce(userTitle);

  const triggerSearch = (title: string) => {
    if (!title.trim()) {
      setMovies([]);
      setLastSearch('');

      return;
    }

    if (title !== lastSearch) {
      setLastSearch(title);
      getMovies({ title });
    }
  };

  useEffect(() => {
    triggerSearch(debouncedTitle);
  }, [debouncedTitle]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        triggerSearch(userTitle);
      }}
      className="searchBar">
      <AiOutlineSearch className="text-gray-400 text-2xl cursor-pointer" onClick={() => triggerSearch(userTitle)} />
      <input
        type="text"
        value={userTitle}
        onChange={(e) => setUserTitle(e.target.value)}
        placeholder="Search movies"
        className="w-full text-white bg-transparent outline-none placeholder-gray-400 text-lg"
      />
    </form>
  );
};

export default SearchBar;
