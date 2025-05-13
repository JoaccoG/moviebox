import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithMemoryRouter } from '@utils/tests';
import type { MovieDetails as TypeMovieDetails } from '@type/movies';
import MovieDetails from './MovieDetails';

const mockedMovie = {
  Title: 'Mocked Movie',
  Poster: '/mock-poster.jpg',
  Runtime: '120 min',
  Year: '2023',
  Rated: 'PG-13',
  imdbRating: '8.5',
  Plot: 'Mocked movie plot description.',
  Actors: 'Actor 1, Actor 2, Actor 3',
  Genre: 'Action, Adventure',
  Director: 'Director 1, Director 2',
  Writer: 'Writer 1, Writer 2'
} as TypeMovieDetails;

vi.mock('@contexts/movies/context', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...(actual as object),
    useMovies: vi.fn(() => ({
      movie: mockedMovie,
      movies: [],
      setMovie: vi.fn(),
      setMovies: vi.fn(),
      getMovie: vi.fn(async () => Promise.resolve({ Title: 'Mocked Movie' })),
      getMovies: vi.fn(),
      loading: false,
      error: null
    }))
  };
});

describe('Given a MovieDetails component', () => {
  describe('When it is called with a valid ID', () => {
    it('Then it should render movie details correctly', async () => {
      renderWithMemoryRouter(<MovieDetails id="1" />, { initialEntries: ['/details/1'] });
      await waitFor(() => expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Mocked Movie'));
    });

    it('Then it should show a loading spinner while fetching data', async () => {
      vi.mocked(await import('@contexts/movies/context')).useMovies.mockReturnValueOnce({
        movie: null,
        movies: [],
        setMovie: vi.fn(),
        setMovies: vi.fn(),
        getMovie: vi.fn(),
        getMovies: vi.fn(),
        loading: true,
        error: null
      });

      renderWithMemoryRouter(<MovieDetails id="1" />, { initialEntries: ['/details/1'] });
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  describe('When the data fetching fails', () => {
    it('Then it should show an error component', async () => {
      vi.mocked(await import('@contexts/movies/context')).useMovies.mockReturnValueOnce({
        movie: null,
        movies: [],
        setMovie: vi.fn(),
        setMovies: vi.fn(),
        getMovie: vi.fn(),
        getMovies: vi.fn(),
        loading: false,
        error: 'Mocked error message'
      });

      renderWithMemoryRouter(<MovieDetails id="1" />, { initialEntries: ['/details/1'] });
      expect(screen.getByTestId('error-component')).toBeInTheDocument();
    });
  });

  describe('When the user clicks the back button', () => {
    it('Then it should navigate back to the previous page', async () => {
      renderWithMemoryRouter(<MovieDetails id="1" />, { initialEntries: ['/details/1'] });
      const backButton = screen.getByRole('button');
      backButton.click();
      await waitFor(() => expect(location.pathname).toBe('/'));
    });
  });

  describe('When the movie title has ":" in it', () => {
    it('Then it should render the title correctly', async () => {
      vi.mocked(await import('@contexts/movies/context')).useMovies.mockReturnValueOnce({
        movie: {
          ...mockedMovie,
          Title: 'Mocked Movie: The Sequel'
        },
        movies: [],
        setMovie: vi.fn(),
        setMovies: vi.fn(),
        getMovie: vi.fn(),
        getMovies: vi.fn(),
        loading: false,
        error: null
      });

      renderWithMemoryRouter(<MovieDetails id="1" />, { initialEntries: ['/details/1'] });
      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Mocked Movie');
        expect(screen.getAllByRole('heading', { level: 2 })[0]).toHaveTextContent(
          'Original title: Mocked Movie: The Sequel'
        );
      });
    });
  });
});
