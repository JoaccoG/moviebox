import { screen } from '@testing-library/react';
import { renderWithMemoryRouter } from '@utils/tests';
import ErrorComponent from './ErrorComponent';

describe('Given an ErrorComponent component', () => {
  describe('When it is rendered', () => {
    it('Then it should be in the document', () => {
      renderWithMemoryRouter(<ErrorComponent error={{ message: 'Test error' }} />);
      expect(screen.getByTestId('error-component')).toBeInTheDocument();
    });
  });
});
