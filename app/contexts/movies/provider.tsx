import { useState, useMemo, useCallback } from 'react';
import type { MovieDetails, GetMoviesOptions, GetMovieDetailsOptions, GetMoviesResponse } from '@type/movies';
import { getMovieDetails, getMovies } from '@services/omdb-service';
import { MoviesContext } from './context';

interface MoviesProviderProps {
  children: React.ReactNode;
}

export const MoviesProvider = ({ children }: MoviesProviderProps) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [movies, setMovies] = useState<GetMoviesResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async (options: GetMoviesOptions) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getMovies(options);

      if (response.status !== 200 || !response.data)
        throw new Error(response.error ?? 'Unknown error while trying to fetch movies');

      setMovies(response.data);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchNextMovies = useCallback(
    async (options: GetMoviesOptions) => {
      setLoading(true);
      setError(null);

      try {
        const response = await getMovies(options);

        if (response.status !== 200 || !response.data)
          throw new Error(response.error ?? 'Unknown error while trying to fetch next movies');

        const newMovies = {
          ...response.data,
          movies: [...(movies?.movies ?? []), ...(response.data.movies ?? [])]
        };

        setMovies(newMovies);
      } catch (error) {
        setError(error as string);
      } finally {
        setLoading(false);
      }
    },
    [movies]
  );

  const fetchMovieDetails = useCallback(async (options: GetMovieDetailsOptions) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getMovieDetails(options);

      if (response.status !== 200 || !response.data)
        throw new Error(response.error ?? 'Unknown error while trying to fetch movie');

      setMovie(response.data);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      movie,
      movies,
      setMovie,
      setMovies,
      getMovie: fetchMovieDetails,
      getMovies: fetchMovies,
      getNextMovies: fetchNextMovies,
      loading,
      error
    }),
    [movie, movies]
  );

  return <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>;
};
