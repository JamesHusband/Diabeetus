import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorState } from './ErrorState';

describe('ErrorState', () => {
  const errorMessage = 'Failed to load glucose data';

  it('renders error message', () => {
    render(<ErrorState message={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders with error text color', () => {
    render(<ErrorState message={errorMessage} />);
    expect(screen.getByText(errorMessage)).toHaveClass('text-red-500');
  });

  it('maintains consistent height with other states', () => {
    render(<ErrorState message={errorMessage} />);
    expect(screen.getByRole('complementary')).toHaveClass('h-[400px]');
  });

  it('centers error message', () => {
    render(<ErrorState message={errorMessage} />);
    expect(screen.getByRole('complementary')).toHaveClass(
      'flex',
      'items-center',
      'justify-center'
    );
  });
});
