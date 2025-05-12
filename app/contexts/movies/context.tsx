import { createContext, useContext } from 'react';
import type { Movie, MovieDetails, GetMoviesOptions, GetMovieDetailsOptions } from '@type/movies';

export interface MoviesContextType {
  movie: MovieDetails;
  movies: Movie[];
  setMovie: (movie: MovieDetails) => void;
  setMovies: (movies: Movie[]) => void;
  getMovie: (options: GetMovieDetailsOptions) => Promise<void>;
  getMovies: (options: GetMoviesOptions) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

export const useMovies = (): MoviesContextType => {
  const context = useContext(MoviesContext);
  if (!context) throw new Error('useMovies must be used within a MoviesProvider');

  return context;
};
