import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

/**
 * Renders a React component wrapped in a MemoryRouter for testing.
 *
 * This utility function is used to test components that requires routing.
 * It allows specifying initial routes to mimic navigation.
 *
 * @param {React.ReactElement} children - The React component to render.
 * @param {string[]} initialEntries (optional) - Array of route paths to initialize the router.
 *
 * @returns {ReturnType<typeof render>} - The result of the render from @testing-library/react.
 */
export const renderWithMemoryRouter = (
  children: React.ReactElement,
  { initialEntries = ['/'] }: { initialEntries?: string[] } = {}
): ReturnType<typeof render> => {
  return render(<MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>);
};
