import { vi, describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithMemoryRouter } from '@utils/tests';
import MoviesList from './MoviesList';

describe('Given a MoviesList component', () => {
  describe('When it is rendered', () => {
    it('Then it should be in the document', () => {
      renderWithMemoryRouter(<MoviesList />);

      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  describe('When movies are loading', () => {
    it('Then it should display the loading state', () => {
      renderWithMemoryRouter(<MoviesList />, { moviesContextValue: { loading: true } });

      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  describe('When there is an error', () => {
    it('Then it should display the error message', () => {
      renderWithMemoryRouter(<MoviesList />, { moviesContextValue: { error: 'Failed to fetch movies' } });

      expect(screen.getByTestId('error-component')).toBeInTheDocument();
    });
  });

  describe('When there are no movies', () => {
    it('Then it should display the empty state message', () => {
      renderWithMemoryRouter(<MoviesList />, {
        moviesContextValue: {
          movies: { totalResults: 0, totalPages: 0, currentPage: 0, nextPage: null, previousPage: null, movies: [] }
        }
      });

      expect(screen.getByText(/what to search?/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /offer/i })).toBeInTheDocument();
    });
  });

  describe('When movies exist', () => {
    it('Then it should render a list of movies', () => {
      const mockMovies = {
        totalResults: 2,
        totalPages: 1,
        currentPage: 1,
        nextPage: null,
        previousPage: null,
        movies: [
          { Title: 'Test 1', imdbID: '123456', Year: '2025', Type: 'movie', Poster: 'https://example.com/test.jpg' },
          { Title: 'Test 2', imdbID: '654321', Year: '2025', Type: 'movie', Poster: 'https://example.com/test.jpg' }
        ]
      };
      renderWithMemoryRouter(<MoviesList />, {
        moviesContextValue: { movies: mockMovies }
      });

      expect(screen.getByTestId('movies-list')).toBeInTheDocument();
      expect(screen.getByText('Test 1')).toBeInTheDocument();
      expect(screen.getByText('Test 2')).toBeInTheDocument();
    });
  });

  describe('When the offer button is clicked', () => {
    it('Then it should trigger the offer function', () => {
      vi.spyOn(console, 'log');
      renderWithMemoryRouter(<MoviesList />);

      const offerButton = screen.getByRole('button', { name: /offer/i });
      fireEvent.click(offerButton);

      expect(console.log).toHaveBeenCalledWith('Offer clicked');
    });
  });
});
