import { vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithMemoryRouter } from '@utils/tests';
import AddComment from './AddComment';

describe('Given an AddComment component', () => {
  const mockOnAddComment = vi.fn();

  describe('When it is rendered', () => {
    it('Then it should display the rating section, input fields, and submit button', () => {
      renderWithMemoryRouter(<AddComment movieId="1" onAddComment={mockOnAddComment} />);
      expect(screen.getByText('Rate:')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Add your comments here')).toBeInTheDocument();
      expect(screen.getByText('Post')).toBeInTheDocument();
    });
  });

  describe('When submitting without selecting a rating', () => {
    it('Then it should display an error message', async () => {
      renderWithMemoryRouter(<AddComment movieId="1" onAddComment={mockOnAddComment} />);
      fireEvent.click(screen.getByText('Post'));
      expect(screen.getByText('Select a rating between 1 and 5.')).toBeInTheDocument();
    });
  });

  describe('When submitting without entering a name', () => {
    it('Then it should display an error message', async () => {
      renderWithMemoryRouter(<AddComment movieId="1" onAddComment={mockOnAddComment} />);
      fireEvent.click(screen.getByTestId('star-4'));
      fireEvent.click(screen.getByText('Post'));
      expect(screen.getByText('Enter your name to submit a comment.')).toBeInTheDocument();
    });
  });

  describe('When submitting without entering a comment', () => {
    it('Then it should display an error message', async () => {
      renderWithMemoryRouter(<AddComment movieId="1" onAddComment={mockOnAddComment} />);
      fireEvent.click(screen.getByTestId('star-4'));
      fireEvent.change(screen.getByPlaceholderText('Your name'), { target: { value: 'Test User' } });
      fireEvent.click(screen.getByText('Post'));
      expect(screen.getByText('The comment cannot be empty.')).toBeInTheDocument();
    });
  });

  describe('When the user exceeds the character limit in the comment', () => {
    it('Then it should display an error message', async () => {
      renderWithMemoryRouter(<AddComment movieId="1" onAddComment={mockOnAddComment} />);
      fireEvent.click(screen.getByTestId('star-4'));
      fireEvent.change(screen.getByPlaceholderText('Your name'), { target: { value: 'Test User' } });
      fireEvent.change(screen.getByPlaceholderText('Add your comments here'), {
        target: { value: 'a'.repeat(501) }
      });
      expect(screen.getByText('Your comment exceeds the 500-character limit.')).toBeInTheDocument();
    });
  });
});
