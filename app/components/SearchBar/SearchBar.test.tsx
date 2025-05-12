import { vi, describe, it, expect } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithMemoryRouter } from '@utils/tests';
import { MoviesProvider } from '@contexts/movies/provider';
import SearchBar from './SearchBar';

describe('Given a SearchBar component', () => {
  describe('When it is rendered', () => {
    it('Then it should have an input field', () => {
      renderWithMemoryRouter(<SearchBar />);

      expect(screen.getByPlaceholderText('Search movies')).toBeInTheDocument(); // Cambié de "button" a "input"
    });
  });

  describe('When the user types in the search input', () => {
    it('Then the input value should update', () => {
      renderWithMemoryRouter(
        <MoviesProvider>
          <SearchBar />
        </MoviesProvider>
      );

      const input = screen.getByPlaceholderText('Search movies');
      fireEvent.change(input, { target: { value: 'Batman' } });

      expect(input).toHaveValue('Batman');
    });
  });

  describe('When the user submits the form by pressing enter', () => {
    it('Then getMovies should be called with the correct title', async () => {
      const mockGetMovies = vi.fn();
      renderWithMemoryRouter(<SearchBar />, {
        moviesContextValue: { getMovies: mockGetMovies, setMovies: vi.fn(), movies: [] }
      });

      const input = screen.getByPlaceholderText('Search movies');
      fireEvent.change(input, { target: { value: 'Batman' } });

      const form = screen.getByTestId('form');
      fireEvent.submit(form);

      await waitFor(() => expect(mockGetMovies).toHaveBeenCalledWith({ title: 'Batman' }));
    });
  });

  describe('When the user clicks the search icon', () => {
    it('Then getMovies should be called with the correct title', async () => {
      const mockGetMovies = vi.fn();
      renderWithMemoryRouter(<SearchBar />, {
        moviesContextValue: { getMovies: mockGetMovies, setMovies: vi.fn(), movies: [] }
      });

      const input = screen.getByPlaceholderText('Search movies');
      fireEvent.change(input, { target: { value: 'Batman' } });

      const searchIcon = screen.getByTestId('searchIcon');
      fireEvent.click(searchIcon);

      await waitFor(() => expect(mockGetMovies).toHaveBeenCalledWith({ title: 'Batman' }));
    });
  });
});
