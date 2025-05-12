import SearchBar from '@components/SearchBar/SearchBar';
import MoviesList from '@components/MoviesList/MoviesList';

export default function Home() {
  return (
    <main className="flex flex-grow h-full flex-1">
      <SearchBar />
      <MoviesList />
    </main>
  );
}
