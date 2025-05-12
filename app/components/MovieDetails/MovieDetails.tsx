import { type FC, useEffect } from 'react';
import { useMovies } from '@contexts/movies/context';
import './MovieDetails.css';

interface MovieDetailsProps {
  id: string | undefined;
}

const MovieDetails: FC<MovieDetailsProps> = ({ id }) => {
  const { movie, setMovie, getMovie } = useMovies();

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    setMovie(null);
    if (id) await getMovie({ id });
  };

  return (
    <div>
      {movie && (
        <div>
          <h1>{movie.Title}</h1>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
