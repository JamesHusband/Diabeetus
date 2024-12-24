import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders no data message', () => {
    render(<EmptyState />);
    expect(screen.getByText('No glucose data available.')).toBeInTheDocument();
  });

  it('renders with muted text color', () => {
    render(<EmptyState />);
    expect(screen.getByText('No glucose data available.')).toHaveClass(
      'text-gray-500'
    );
  });

  it('maintains consistent height with other states', () => {
    render(<EmptyState />);
    expect(screen.getByRole('complementary')).toHaveClass('h-[400px]');
  });

  it('centers empty state message', () => {
    render(<EmptyState />);
    expect(screen.getByRole('complementary')).toHaveClass(
      'flex',
      'items-center',
      'justify-center'
    );
  });
});
