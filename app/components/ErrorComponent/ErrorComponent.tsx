import type { FC } from 'react';

interface ErrorComponentProps {
  error?: any;
}

const ErrorComponent: FC<ErrorComponentProps> = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen" data-testid="error-component">
      <h1 className="text-4xl font-bold text-red-600">Error</h1>
      <p className="mt-4 text-lg text-gray-700">Something went wrong. Please try again later.</p>
      <p className="mt-2 text-sm text-gray-500">{error?.message ?? 'An unexpected error occurred.'}</p>
    </div>
  );
};

export default ErrorComponent;
