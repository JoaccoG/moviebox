import { vi, type Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { isRouteErrorResponse } from 'react-router';
import { renderWithMemoryRouter } from '@utils/testUtils';
import App, { links, ErrorBoundary } from '~/root';

describe('Given the App component with routes', () => {
  describe('When navigating to a route', () => {
    it('Then it should render the correct component', async () => {
      renderWithMemoryRouter(<App />, { initialEntries: ['/'] });
      await waitFor(() => expect(document.querySelector('body')).toBeInTheDocument());
    });
  });
});

describe('Given the links function', () => {
  describe('When they are called', () => {
    it('Then it should return the correct link elements', () => {
      const result = links();
      expect(result).toContainEqual(expect.objectContaining({ rel: 'preconnect' }));
      expect(result).toContainEqual(expect.objectContaining({ rel: 'stylesheet' }));
    });
  });
});

vi.mock('react-router', () => ({
  isRouteErrorResponse: vi.fn()
}));

describe('Given an ErrorBoundary utility', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('When there is an error', () => {
    it('Then it should display stack trace', () => {
      (isRouteErrorResponse as unknown as Mock).mockReturnValue(false);
      const originalEnv = import.meta.env.DEV;
      import.meta.env.DEV = true;
      const error = new Error('Stack trace test');
      error.stack = 'Error: Stack trace test\nat line 1';
      render(<ErrorBoundary error={error} params={{}} />);
      expect(screen.getByText('Oops!')).toBeInTheDocument();
      expect(screen.getByText('Stack trace test')).toBeInTheDocument();
      expect(screen.getByText(/at line 1/)).toBeInTheDocument();
      import.meta.env.DEV = originalEnv;
    });
  });

  describe('When the error is a RouteErrorResponse with status 404', () => {
    it('Then it should display a 404 message', () => {
      (isRouteErrorResponse as unknown as Mock).mockReturnValue(true);
      render(<ErrorBoundary error={{ status: 404, statusText: 'Not Found' }} params={{}} />);
      expect(screen.getByText('404')).toBeInTheDocument();
      expect(screen.getByText('The requested page could not be found.')).toBeInTheDocument();
    });
  });

  describe('When the error is a RouteErrorResponse with a different status', () => {
    it('Then it should display a custom error message', () => {
      (isRouteErrorResponse as unknown as Mock).mockReturnValue(true);
      render(<ErrorBoundary error={{ status: 500, statusText: 'Internal Server Error' }} params={{}} />);
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('Internal Server Error')).toBeInTheDocument();
    });
  });

  describe('When the error is a RouteErrorResponse with no statusText', () => {
    it('Then it should display the default details message', () => {
      (isRouteErrorResponse as unknown as Mock).mockReturnValue(true);
      render(<ErrorBoundary error={{ status: 500 }} params={{}} />);
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('An unexpected error occurred.')).toBeInTheDocument();
    });
  });

  describe('When the error is an instance of Error with no message', () => {
    it('Then it should display a TypeScript error message', () => {
      (isRouteErrorResponse as unknown as Mock).mockReturnValue(false);
      render(<ErrorBoundary error={new Error('Something went wrong')} params={{}} />);
      expect(screen.getByText('Oops!')).toBeInTheDocument();
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  describe('When the error is not an instance of Error or RouteErrorResponse', () => {
    it('Then it should display a generic message', () => {
      (isRouteErrorResponse as unknown as Mock).mockReturnValue(false);
      render(<ErrorBoundary error={{}} params={{}} />);
      expect(screen.getByText('Oops!')).toBeInTheDocument();
      expect(screen.getByText('An unexpected error occurred.')).toBeInTheDocument();
    });
  });
});
