import type { Movie, GetMoviesOptions, GetMoviesResponse, GetMovieDetailsOptions } from '@type/movies';

const API_KEY = process.env.OMDB_API_KEY;
const API_URL = `${process.env.OMDB_BASE_URL}?apikey=${API_KEY}`;

/**
 * Fetches a list of movies from the OMDb API based on a query string.
 *
 * This function retrieves a paginated list of movies matching the given search query.
 * It also calculates pagination data, including current, next, and previous pages.
 *
 * @param {string} options.query - The movie title to search for.
 * @param {number} options.page - The page number to retrieve. Defaults to 1.
 *
 * @returns {Promise<GetMoviesResponse>} - A promise that resolves to an object containing:
 *  - totalResults: The total number of results.
 *  - totalPages: The total number of pages available.
 *  - currentPage: The current page number.
 *  - nextPage: URL for the next page (if available).
 *  - previousPage: URL for the previous page (if available).
 *  - data: An array of movies with basic info.
 *
 * @throws {Error} - If the query parameter is missing or the fetch request fails.
 *
 * @example
 * const movies = await getMovies({ query: 'Batman', page: 1 });
 * console.log(movies.data);
 */
export const getMovies = async (options: GetMoviesOptions): Promise<GetMoviesResponse> => {
  try {
    const { query, page = 1 } = options;
    if (!query) throw new Error('Missing required "query" parameter');

    const url = `${API_URL}&s=${query}&type=movie`;
    const response = await fetch(`${url}&page=${page}`);
    if (!response.ok) throw new Error(`Error fetching movies: ${response.statusText}`);

    const data: { Search: Array<Pick<Movie, 'Title' | 'Year' | 'imdbID' | 'Type' | 'Poster'>>; totalResults: string } =
      await response.json();

    const TOTAL_NUMBER_PER_PAGE = 10;
    const CURRENT_PAGE = page;

    const totalResults = parseInt(data.totalResults, TOTAL_NUMBER_PER_PAGE) || 0;
    const totalPages = Math.ceil(totalResults / TOTAL_NUMBER_PER_PAGE);
    const nextPage = CURRENT_PAGE < totalPages ? `${url}&page=${CURRENT_PAGE + 1}` : null;
    const previousPage = CURRENT_PAGE > 1 ? `${url}&page=${CURRENT_PAGE - 1}` : null;

    const result: GetMoviesResponse = {
      totalResults: Number(data.totalResults),
      totalPages: totalPages,
      currentPage: CURRENT_PAGE,
      nextPage: nextPage ?? null,
      previousPage: previousPage ?? null,
      data: data.Search
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

/**
 * Fetches detailed information about a specific movie from the OMDb API.
 *
 * This function retrieves movie details such as title, plot, cast, and more.
 *
 * @param {string} options.id - The IMDb ID of the movie to fetch.
 *
 * @returns {Promise<Movie>} - A promise that resolves to an object containing detailed movie information.
 *
 * @throws {Error} - If the ID parameter is missing or the fetch request fails.
 *
 * @example
 * const movieDetails = await getMovieDetails({ id: 'tt1375666' });
 * console.log(movieDetails);
 */
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
