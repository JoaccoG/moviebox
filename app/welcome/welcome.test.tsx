import { screen } from '@testing-library/react';
import { renderWithMemoryRouter } from '@utils/tests';
import { Welcome } from './welcome';

describe('Given a Welcome component', () => {
  describe('When it is invoked', () => {
    it('Then it should render', () => {
      renderWithMemoryRouter(<Welcome />);
      expect(screen.getByText('React Router Docs')).toBeInTheDocument();
    });
  });
});
