import { useParams } from 'react-router';
import MovieDetails from '@components/MovieDetails/MovieDetails';
import Comments from '@components/Comments/Comments';

export default function Details() {
  const { id } = useParams();

  return (
    <main className="flex flex-grow h-full flex-1 gap-8">
      <MovieDetails id={id} />
      <Comments movieId={id} />
    </main>
  );
}
