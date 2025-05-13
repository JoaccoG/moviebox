import { screen } from '@testing-library/react';
import { renderWithMemoryRouter } from '@utils/tests';
import Details from './details';

describe('Given a Details page', () => {
  describe('When it is rendered', () => {
    it('Then it should be in the document', () => {
      renderWithMemoryRouter(<Details />);
      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });
});
