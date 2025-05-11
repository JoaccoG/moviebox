export interface Movie {
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
  query: string;
  page?: number;
}

export interface GetMoviesResponse {
  totalResults: number;
  totalPages: number;
  currentPage: number;
  nextPage: string | null;
  previousPage: string | null;
  data: Array<Pick<Movie, 'Title' | 'Year' | 'imdbID' | 'Type' | 'Poster'>>;
}

export interface GetMovieDetailsOptions {
  id: string;
}
