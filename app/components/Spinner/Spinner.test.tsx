import { screen } from '@testing-library/react';
import { renderWithMemoryRouter } from '@utils/tests';
import Spinner from './Spinner';

describe('Given a Spinner component', () => {
  describe('When it is rendered', () => {
    it('Then it should show a loading spinner', () => {
      renderWithMemoryRouter(<Spinner />);
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });
});
