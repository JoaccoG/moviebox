import { vi, describe, it, expect } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithMemoryRouter } from '@utils/tests';
import { MoviesProvider } from '@contexts/movies/provider';
import SearchBar from './SearchBar';

describe('Given a SearchBar component', () => {
  describe('When it is rendered', () => {
    it('Then it should have an input field', () => {
      renderWithMemoryRouter(<SearchBar />);
      expect(screen.getByPlaceholderText('Search movies')).toBeInTheDocument();
    });
  });

  describe('When the user types in the search input', () => {
    it('Then the input value should update', () => {
      renderWithMemoryRouter(<SearchBar />);

      const input = screen.getByPlaceholderText('Search movies');
      fireEvent.change(input, { target: { value: 'Batman' } });

      expect(input).toHaveValue('Batman');
    });
  });

  describe('When the user submits the form by pressing enter', () => {
    it('Then getMovies should be called with the correct title', async () => {
      const mockGetMovies = vi.fn();
      renderWithMemoryRouter(<SearchBar />, {
        moviesContextValue: {
          getMovies: mockGetMovies,
          setMovies: vi.fn(),
          movies: { totalResults: 0, totalPages: 0, currentPage: 0, nextPage: null, previousPage: null, movies: [] }
        }
      });

      const input = screen.getByPlaceholderText('Search movies');
      fireEvent.change(input, { target: { value: 'Batman' } });
      fireEvent.submit(screen.getByTestId('form'));

      await waitFor(() => expect(mockGetMovies).toHaveBeenCalledWith({ title: 'Batman' }));
    });
  });

  describe('When the user clicks the search icon', () => {
    it('Then getMovies should be called with the correct title', async () => {
      const mockGetMovies = vi.fn();
      renderWithMemoryRouter(<SearchBar />, {
        moviesContextValue: {
          getMovies: mockGetMovies,
          setMovies: vi.fn(),
          movies: { totalResults: 0, totalPages: 0, currentPage: 0, nextPage: null, previousPage: null, movies: [] }
        }
      });

      const input = screen.getByPlaceholderText('Search movies');
      fireEvent.change(input, { target: { value: 'Batman' } });
      fireEvent.click(screen.getByTestId('searchIcon'));

      await waitFor(() => expect(mockGetMovies).toHaveBeenCalledWith({ title: 'Batman' }));
    });
  });
});
