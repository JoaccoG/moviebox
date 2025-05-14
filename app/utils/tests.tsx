import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import type { Movie, MovieDetails } from '@type/movies';
import { MoviesContext, type MoviesContextType } from '@contexts/movies/context';
import { MoviesProvider } from '@contexts/movies/provider';

/**
 * Renders a React component wrapped in a MemoryRouter for testing.
 *
 * This utility function is used to test components that require routing.
 * It allows specifying initial routes to mimic navigation and optionally
 * injecting custom values into the `MoviesContext`.
 *
 * If `moviesContextValue` is provided, the component will be wrapped inside
 * a `MoviesContext.Provider` with the specified values, allowing for customized
 * behavior in tests. Otherwise, it defaults to using `MoviesProvider`.
 *
 * @param {React.ReactElement} children - The React component to render.
 * @param {RenderOptions} options (optional) - Additional options for rendering.
 * @param {string[]} options.initialEntries - Array of route paths to initialize the router. Defaults to ['/'].
 * @param {Partial<MoviesContextType>} options.moviesContextValue - Custom context values for MoviesProvider.
 *
 * @returns {ReturnType<typeof render>} - The result of the render from @testing-library/react.
 *
 * @example
 * // Standard usage
 * renderWithMemoryRouter(<Home />);
 *
 * @example
 * // Injecting custom MoviesContext values
 * renderWithMemoryRouter(<SearchBar />, {
 *   moviesContextValue: { getMovies: vi.fn(), movies: [{ Title: 'Batman', imdbID: 'tt123' }] }
 * });
 */
interface RenderOptions {
  initialEntries?: string[];
  moviesContextValue?: Partial<MoviesContextType>;
}

export const renderWithMemoryRouter = (
  children: React.ReactElement,
  { initialEntries = ['/'], moviesContextValue }: RenderOptions = {}
): ReturnType<typeof render> => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {moviesContextValue ? (
        <MoviesContext.Provider
          value={{
            movie: {} as MovieDetails,
            movies: { totalResults: 0, totalPages: 0, currentPage: 0, nextPage: null, previousPage: null, movies: [] },
            setMovie: vi.fn(),
            setMovies: vi.fn(),
            getMovies: vi.fn(),
            getMovie: vi.fn(),
            loading: false,
            error: null,
            ...moviesContextValue
          }}>
          {children}
        </MoviesContext.Provider>
      ) : (
        <MoviesProvider>{children}</MoviesProvider>
      )}
    </MemoryRouter>
  );
};
