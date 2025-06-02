import { render, screen, fireEvent } from '@testing-library/react';
import { NavigationButtons } from './NavigationButtons';

describe('NavigationButtons', () => {
  const defaultProps = {
    activeSection: 'home',
    onNavigate: jest.fn(),
  };

  beforeEach(() => {
    defaultProps.onNavigate.mockClear();
  });

  it('renders all navigation buttons', () => {
    render(<NavigationButtons {...defaultProps} />);
    expect(screen.getByRole('button', { name: /home/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /trends/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /glucose/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /carbs/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /chat/i })).toBeTruthy();
  });

  it('applies active styles to the selected section', () => {
    render(<NavigationButtons {...defaultProps} />);
    const homeButton = screen.getByRole('button', { name: /home/i });
    expect(homeButton).toHaveClass('text-primary', 'bg-accent');
  });

  it('applies inactive styles to non-selected sections', () => {
    render(<NavigationButtons {...defaultProps} />);
    const trendsButton = screen.getByRole('button', { name: /trends/i });
    expect(trendsButton).toHaveClass('text-muted-foreground');
  });

  it('calls onNavigate with correct section when button is clicked', () => {
    render(<NavigationButtons {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /trends/i }));
    expect(defaultProps.onNavigate).toHaveBeenCalledWith('trends');
  });

  it('renders icons with correct size', () => {
    render(<NavigationButtons {...defaultProps} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      const icon = button.querySelector('svg');
      expect(icon).toBeTruthy();
      expect(icon).toHaveClass('h-7', 'w-7');
    });
  });

  it('renders labels with correct text size', () => {
    render(<NavigationButtons {...defaultProps} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      const label = button.querySelector('span');
      expect(label).toBeTruthy();
      expect(label).toHaveClass('text-sm', 'font-medium');
    });
  });
});
