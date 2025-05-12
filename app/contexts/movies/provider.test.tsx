import { render, screen, act } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { MoviesProvider } from './provider';
import { useMovies } from './context';

const TestComponent = () => {
  const { movies, movie, loading, error, getMovies, getMovie } = useMovies();

  return (
    <div>
      <p data-testid="movies-length">{movies.length}</p>
      <p data-testid="movie-title">{movie?.Title || 'No Movie'}</p>
      <p data-testid="loading-state">{loading ? 'Loading...' : 'Not Loading'}</p>
      <p data-testid="error-state">{error ?? 'No Error'}</p>
      <button onClick={() => getMovies({ title: 'Test 1' })}>Fetch Movies</button>
      <button onClick={() => getMovie({ id: '123456' })}>Fetch Movie Details</button>
    </div>
  );
};

describe('Given a Movies provider', () => {
  describe('When it is called', () => {
    it('Then it should provide default values', () => {
      render(
        <MoviesProvider>
          <TestComponent />
        </MoviesProvider>
      );

      expect(screen.getByTestId('movies-length')).toHaveTextContent('0');
      expect(screen.getByTestId('movie-title')).toHaveTextContent('No Movie');
      expect(screen.getByTestId('loading-state')).toHaveTextContent('Not Loading');
      expect(screen.getByTestId('error-state')).toHaveTextContent('No Error');
    });

    it('Then it should handle getMovie call correctly', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ Title: 'Test 1', imdbID: '123456' })
      } as Response);

      render(
        <MoviesProvider>
          <TestComponent />
        </MoviesProvider>
      );

      await act(async () => screen.getByRole('button', { name: 'Fetch Movie Details' }).click());

      expect(screen.getByTestId('movie-title')).toHaveTextContent('Test 1');
      expect(screen.getByTestId('error-state')).toHaveTextContent('No Error');
    });

    it('Then it should handle getMovies call correctly', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ Search: [{ Title: 'Test 2', imdbID: '654321' }], totalResults: '1' })
      } as Response);

      render(
        <MoviesProvider>
          <TestComponent />
        </MoviesProvider>
      );

      await act(async () => screen.getByRole('button', { name: 'Fetch Movies' }).click());

      expect(screen.getByTestId('movies-length')).toHaveTextContent('1');
      expect(screen.getByTestId('error-state')).toHaveTextContent('No Error');
    });

    it('Then it should handle the loading state correctly', async () => {
      vi.spyOn(global, 'fetch').mockImplementation(async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));

        return { ok: true, json: async () => ({ Search: [], totalResults: '0' }) } as Response;
      });

      render(
        <MoviesProvider>
          <TestComponent />
        </MoviesProvider>
      );

      await act(async () => screen.getByRole('button', { name: 'Fetch Movies' }).click());

      expect(screen.getByTestId('loading-state')).toHaveTextContent('Not Loading');
    });
  });

  describe('When there is an error', () => {
    it('Then it should handle them correctly', async () => {
      vi.spyOn(global, 'fetch').mockResolvedValue({ ok: false, statusText: 'No Error' } as Response);

      render(
        <MoviesProvider>
          <TestComponent />
        </MoviesProvider>
      );
      await act(async () => screen.getByRole('button', { name: 'Fetch Movies' }).click());

      expect(screen.getByTestId('error-state')).toHaveTextContent('No Error');
    });
  });
});
