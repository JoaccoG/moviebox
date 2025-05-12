export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{ source: string; value: string }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface GetMoviesOptions {
  title: string;
  query?: string;
  page?: number;
}

export interface GetMovieDetailsOptions {
  id: string;
  query?: string;
}

export interface OMDbServiceResponse<T> {
  status: number;
  error?: string;
  data?: T;
}

export interface GetMoviesResponse {
  totalResults: number;
  totalPages: number;
  currentPage: number;
  nextPage: string | null;
  previousPage: string | null;
  movies: Movie[];
}
