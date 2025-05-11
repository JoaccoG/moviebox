import { screen } from '@testing-library/react';
import { renderWithMemoryRouter } from '@utils/tests';
import Home from './home';

describe('Given a Home page', () => {
  describe('When it is rendered', () => {
    it('Then it should be in the document', () => {
      renderWithMemoryRouter(<Home />);
      expect(screen.getByRole('heading', { name: /home/i })).toBeInTheDocument();
    });
  });
});
