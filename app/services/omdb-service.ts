import type { Movie } from '@type/movies';

const API_KEY = process.env.OMDB_API_KEY;
const API_URL = `${process.env.OMDB_BASE_URL}?apikey=${API_KEY}`;

interface GetMoviesOptions {
  query: string;
  page?: number;
}
interface GetMoviesResponse {
  Search: Array<Pick<Movie, 'Title' | 'Year' | 'imdbID' | 'Type' | 'Poster'>>;
  totalResults: string;
  currentPage: number;
  totalPages: number;
  nextPage: string | null;
  previousPage: string | null;
}
export const getMovies = async (options: GetMoviesOptions): Promise<GetMoviesResponse> => {
  try {
    const { query, page = 1 } = options;
    if (!query) throw new Error('Missing required "query" parameter');

    const url = `${API_URL}&s=${query}&type=movie`;
    const response = await fetch(`${url}&page=${page}`);
    if (!response.ok) throw new Error(`Error fetching movies: ${response.statusText}`);

    const data: Pick<GetMoviesResponse, 'Search' | 'totalResults'> = await response.json();

    const TOTAL_NUMBER_PER_PAGE = 10;
    const CURRENT_PAGE = page;

    const totalResults = parseInt(data.totalResults, TOTAL_NUMBER_PER_PAGE) || 0;
    const totalPages = Math.ceil(totalResults / TOTAL_NUMBER_PER_PAGE);
    const nextPage = CURRENT_PAGE < totalPages ? `${url}&page=${CURRENT_PAGE + 1}` : null;
    const previousPage = CURRENT_PAGE > 1 ? `${url}&page=${CURRENT_PAGE - 1}` : null;

    const result: GetMoviesResponse = {
      ...data,
      currentPage: CURRENT_PAGE,
      totalPages: totalPages,
      nextPage: nextPage ?? null,
      previousPage: previousPage ?? null
    };

    console.log(`Successfully fetched movies for query: "${query}" on page ${page}`);
    // TODO: Remove console log:
    console.log('fetchMovies - RESULT', result);

    return result;
  } catch (error) {
    console.error(`Error fetching movies: ${error}`);
    throw error;
  }
};

interface GetMovieDetailsOptions {
  id: string;
}
export const getMovieDetails = async (options: GetMovieDetailsOptions): Promise<Movie> => {
  try {
    const { id } = options;
    if (!id) throw new Error('Missing required "id" parameter');

    const url = `${API_URL}&i=${id}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error fetching movie details: ${response.statusText}`);

    const data: Movie = await response.json();

    console.log(`Successfully fetched movie details for ID: "${id}"`);
    // TODO: Remove console log:
    console.log('getMovieDetails - DATA', data);

    return data;
  } catch (error) {
    console.error(`Error fetching movie details: ${error}`);
    throw error;
  }
};
