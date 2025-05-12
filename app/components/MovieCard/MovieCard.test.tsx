import { vi, describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithMemoryRouter } from '@utils/tests';
import type { Movie } from '@type/movies';
import MovieCard from './MovieCard';

const mockMovie: Movie = {
  Title: 'Test',
  Year: '2025',
  imdbID: '123456',
  Type: 'movie',
  Poster: 'https://example.com/test.jpg'
};

describe('Given a MovieCard component', () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe('When it is rendered', () => {
    it('Then it should display the movie poster, title, and link', () => {
      renderWithMemoryRouter(<MovieCard movie={mockMovie} />);

      expect(screen.getByAltText('Test')).toBeInTheDocument();
      expect(screen.getByText('Test')).toBeInTheDocument();
      expect(screen.getByRole('link')).toHaveAttribute('href', '/details/123456');
    });
  });

  describe('When the movie has no poster', () => {
    it('Then it should display the placeholder image', () => {
      const movieWithoutPoster = { ...mockMovie, Poster: 'N/A' };
      renderWithMemoryRouter(<MovieCard movie={movieWithoutPoster} />);

      expect(screen.getByAltText('Test')).toHaveAttribute('src', '/assets/img/movie-card-poster-placeholder.svg');
    });
  });

  describe('When the image fails to load', () => {
    it('Then it should replace it with the placeholder', () => {
      renderWithMemoryRouter(<MovieCard movie={mockMovie} />);

      const img = screen.getByAltText('Test');
      fireEvent.error(img);

      expect(img).toHaveAttribute('src', '/assets/img/movie-card-poster-placeholder.svg');
    });
  });

  describe('When the movie is not of type "movie"', () => {
    it('Then it should display the type label', () => {
      const seriesMovie = { ...mockMovie, Type: 'series' };
      renderWithMemoryRouter(<MovieCard movie={seriesMovie} />);

      expect(screen.getByText('SERIES')).toBeInTheDocument();
    });
  });

  describe('When the user clicks the favorite button', () => {
    it('Then the movie should be marked as favorite and stored in localStorage', () => {
      vi.spyOn(Storage.prototype, 'setItem');
      renderWithMemoryRouter(<MovieCard movie={mockMovie} />);

      const favoriteButton = screen.getByTestId('favorite-icon');
      fireEvent.click(favoriteButton);

      expect(localStorage.setItem).toHaveBeenCalledWith('favorite-123456', 'true');
    });
  });
});
