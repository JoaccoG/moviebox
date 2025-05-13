import { render, screen } from '@testing-library/react';
import CommentsList from './CommentsList';

describe('Given a CommentsList component', () => {
  describe('When there are no comments', () => {
    it('Then it should display a message prompting users to add comments', () => {
      render(<CommentsList comments={[]} />);
      expect(screen.getByText('No comments yet. Be the first!')).toBeInTheDocument();
    });
  });

  describe('When there are comments', () => {
    const mockComments = [
      {
        id: '1',
        movieId: '1',
        CreatedBy: 'Alex',
        CreatedOn: new Date('2025-05-13'),
        rating: 4,
        comment: 'Test 1'
      },
      {
        id: '2',
        movieId: '1',
        CreatedBy: 'Natalia',
        CreatedOn: new Date('2025-05-12'),
        rating: 5,
        comment: 'Test 2'
      }
    ];

    it('Then it should correctly render the comments', () => {
      render(<CommentsList comments={mockComments} />);

      expect(screen.getByText(/Alex/i)).toBeInTheDocument();
      expect(screen.getByText(/Natalia/i)).toBeInTheDocument();
      expect(screen.getByText(/Test 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Test 2/i)).toBeInTheDocument();
      expect(screen.getByText('4/5')).toBeInTheDocument();
      expect(screen.getByText('5/5')).toBeInTheDocument();
    });

    it('Then it should correctly format the date', () => {
      render(<CommentsList comments={mockComments} />);

      expect(screen.getByText('11 May 2025')).toBeInTheDocument();
      expect(screen.getByText('12 May 2025')).toBeInTheDocument();
    });
  });
});
