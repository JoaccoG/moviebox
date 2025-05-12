import { screen } from '@testing-library/react';
import { renderWithMemoryRouter } from '@utils/tests';
import Header from './Header';

describe('Given a Header component', () => {
  describe('When it is rendered', () => {
    it('Then it should be in the document', () => {
      renderWithMemoryRouter(<Header />);
      expect(screen.getByRole('heading', { name: /moviebox/i })).toBeInTheDocument();
    });
  });
});
