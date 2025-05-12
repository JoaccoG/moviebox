import type {
  Movie,
  MovieDetails,
  GetMoviesOptions,
  GetMovieDetailsOptions,
  OMDbServiceResponse,
  GetMoviesResponse
} from '@type/movies';

const LOG_PREFIX = '[OMDb Service]';
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_URL = import.meta.env.VITE_OMDB_BASE_URL;

/**
 * Fetches a list of movies from the OMDb API based on a query string.
 *
 * This function retrieves a paginated list of movies matching the given search query.
 * It also calculates pagination data, including current, next, and previous pages.
 *
 * @param {string} options.title - The movie title to search for.
 * @param {string} options.query (optional) - Additional query options.
 * @param {number} options.page (optional) - The page number to retrieve. Defaults to 1.
 *
 * @returns {Promise<OMDbServiceResponse<GetMoviesResponse>>} - A promise of an object containing:
 *  - totalResults: The total number of results.
 *  - totalPages: The total number of pages available.
 *  - currentPage: The current page number.
 *  - nextPage: URL for the next page (if available).
 *  - previousPage: URL for the previous page (if available).
 *  - data: An array of movies with basic info.
 *
 * @throws {Error} - If the title parameter is missing. If the environment variables are missing. If the request fails.
 *
 * @example
 * const movies = await getMovies({ title: 'Batman', page: 1 });
 * console.log(movies.data);
 */
export const getMovies = async (options: GetMoviesOptions): Promise<OMDbServiceResponse<GetMoviesResponse>> => {
  try {
    const { title, query, page = 1 } = options;
    if (!title) throw new Error('Missing required "title" parameter');
    if (!API_KEY || !API_URL) throw new Error('Missing environment variables');

    const url = `${API_URL}?apikey=${API_KEY}&s=${title}`;
    const queryString = query ? `&${query}` : '';
    const response = await fetch(`${url}${queryString}&page=${page}`);
    if (!response.ok) throw new Error(`Error fetching movies: ${response.statusText}`);

    const data: { Search: Array<Movie>; totalResults: string } = await response.json();

    const totalResults = data.totalResults ? parseInt(data.totalResults, 10) : 0;
    const totalPages = Math.ceil(totalResults / 10);
    const currentPage = page;
    const nextPage = currentPage < totalPages ? `${url}&page=${currentPage + 1}` : null;
    const previousPage = currentPage > 1 ? `${url}&page=${currentPage - 1}` : null;

    console.log(`${LOG_PREFIX} Successfully fetched movies for title: "${title}" on page ${page}`);

    return {
      status: 200,
      error: undefined,
      data: { totalResults, totalPages, currentPage, nextPage, previousPage, movies: data.Search }
    };
  } catch (error) {
    const errorMessage: string = error instanceof Error ? error.message : String(error);
    console.error(`${LOG_PREFIX} Error fetching movies: ${errorMessage}`);

    return { status: 500, error: errorMessage, data: undefined };
  }
};

/**
 * Fetches detailed information about a specific movie from the OMDb API.
 *
 * This function retrieves movie details such as title, plot, cast, and more.
 *
 * @param {string} options.id - The IMDb ID of the movie to fetch.
 * @param {string} options.query (optional) - Additional query options.
 *
 * @returns {Promise<OMDbServiceResponse<GetMoviesResponse>>} - A promise of an object containing movie info.
 *
 * @throws {Error} - If the id parameter is missing. If the environment variables are missing. If the request fails.
 *
 * @example
 * const movieDetails = await getMovieDetails({ id: 'tt1375666' });
 * console.log(movieDetails);
 */
export const getMovieDetails = async (options: GetMovieDetailsOptions): Promise<OMDbServiceResponse<MovieDetails>> => {
  try {
    const { id, query } = options;
    if (!id) throw new Error('Missing required "id" parameter');
    if (!API_KEY || !API_URL) throw new Error('Missing environment variables');

    const url = `${API_URL}?apikey=${API_KEY}&i=${id}`;
    const queryString = query ? `&${query}` : '';
    const response = await fetch(`${url}${queryString}`);
    if (!response.ok) throw new Error(`Error fetching movie details: ${response.statusText}`);

    const data: MovieDetails = await response.json();

    console.log(`${LOG_PREFIX} Successfully fetched movie details for ID: "${id}"`);

    return { status: 200, error: undefined, data };
  } catch (error) {
    const errorMessage: string = error instanceof Error ? error.message : String(error);
    console.error(`${LOG_PREFIX} Error fetching movies: ${errorMessage}`);

    return { status: 500, error: errorMessage, data: undefined };
  }
};
