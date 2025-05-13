import { vi } from 'vitest';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import { renderWithMemoryRouter } from '@utils/tests';
import Comments from './Comments';

// Mocking `useMovies` from context
vi.mock('@contexts/movies/context', async (importOriginal) => {
  const actual = await importOriginal();

  return { ...(actual as object), useMovies: vi.fn(() => ({ loading: false, error: null })) };
});

// Mocking localStorage
const mockLocalStorage = (movieId: string, comments: object[]) => {
  vi.stubGlobal('localStorage', {
    getItem: vi.fn((key) => (key === `comments-${movieId}` ? JSON.stringify(comments) : null)),
    setItem: vi.fn()
  });
};

describe('Given a Comments component', () => {
  describe('When it is rendered with a valid movie ID', () => {
    it('Then it should display the heading "Commentary"', async () => {
      mockLocalStorage('1', []);
      renderWithMemoryRouter(<Comments movieId="1" />, { initialEntries: ['/details/1'] });
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Commentary');
    });
  });

  describe('When there are no comments', () => {
    it('Then it should display a default message', async () => {
      mockLocalStorage('1', []);
      renderWithMemoryRouter(<Comments movieId="1" />, { initialEntries: ['/details/1'] });
      await waitFor(() => expect(screen.getByText(/No comments/i)).toBeInTheDocument());
    });
  });

  describe('When we add a comment', () => {
    it('Then it should display the new comment', async () => {
      mockLocalStorage('1', []);
      renderWithMemoryRouter(<Comments movieId="1" />, { initialEntries: ['/details/1'] });

      const rating = screen.getByTestId('star-4');
      const input = screen.getByPlaceholderText('Your name');
      const textarea = screen.getByPlaceholderText('Add your comments here');

      await waitFor(() => {
        fireEvent.click(rating);
        fireEvent.change(input, { target: { value: 'New User' } });
        fireEvent.change(textarea, { target: { value: 'This is a new comment.' } });
      });

      fireEvent.click(screen.getByText('Post'));

      await waitFor(() => {
        expect(screen.getByText(/New User/i)).toBeInTheDocument();
        expect(screen.getByText(/This is a new comment./i)).toBeInTheDocument();
        expect(localStorage.setItem).toHaveBeenCalledWith('comments-1', expect.stringContaining('New User'));
      });
    });
  });
});
