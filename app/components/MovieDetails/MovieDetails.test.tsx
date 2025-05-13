import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithMemoryRouter } from '@utils/tests';
import MovieDetails from './MovieDetails';

vi.mock('@contexts/movies/context', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...(actual as object),
    useMovies: vi.fn(() => ({
      movie: { Title: 'Mocked Movie' },
      setMovie: vi.fn(),
      getMovie: vi.fn(async () => Promise.resolve({ Title: 'Mocked Movie' }))
    }))
  };
});

describe('Given a MovieDetails component', () => {
  describe('when it is rendered with a valid ID', () => {
    it('Then it should display the movie title', async () => {
      renderWithMemoryRouter(<MovieDetails id="1" />, { initialEntries: ['/movie/1'] });
      await waitFor(() => expect(screen.getByText('Mocked Movie')).toBeInTheDocument());
    });
  });
});
