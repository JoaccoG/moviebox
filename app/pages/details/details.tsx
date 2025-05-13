import { useParams } from 'react-router';
import MovieDetails from '@components/MovieDetails/MovieDetails';

export default function Details() {
  const { id } = useParams();

  return (
    <main className="flex flex-grow h-full flex-1">
      <MovieDetails id={id} />
    </main>
  );
}
