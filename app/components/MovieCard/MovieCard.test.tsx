import { vi, describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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
  describe('When it is rendered', () => {
    it('Then it should display the movie poster and title', () => {
      render(<MovieCard movie={mockMovie} />);

      expect(screen.getByAltText('Test')).toBeInTheDocument();
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });

  describe('When the movie has no poster', () => {
    it('Then it should display the placeholder image', () => {
      const movieWithoutPoster = { ...mockMovie, Poster: 'N/A' };
      render(<MovieCard movie={movieWithoutPoster} />);

      expect(screen.getByAltText('Test')).toHaveAttribute('src', './poster-placeholder');
    });
  });

  describe('When the movie is not of type "movie"', () => {
    it('Then it should display the type label', () => {
      const seriesMovie = { ...mockMovie, Type: 'series' };
      render(<MovieCard movie={seriesMovie} />);

      expect(screen.getByText('SERIES')).toBeInTheDocument();
    });
  });

  describe('When the user clicks the favorite button', () => {
    it('Then the movie should be marked as favorite and stored in localStorage', () => {
      vi.spyOn(Storage.prototype, 'setItem');
      render(<MovieCard movie={mockMovie} />);

      const favoriteButton = screen.getByRole('button');
      fireEvent.click(favoriteButton);

      expect(localStorage.setItem).toHaveBeenCalledWith('favorite-123456', 'true');
    });
  });
});
