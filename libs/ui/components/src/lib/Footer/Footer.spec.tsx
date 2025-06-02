/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  const defaultProps = {
    activeSection: 'home',
    onNavigate: jest.fn(),
  };

  it('renders navigation buttons', () => {
    render(<Footer {...defaultProps} />);
    expect(screen.getByRole('button', { name: /home/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /trends/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /glucose/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /carbs/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /chat/i })).toBeTruthy();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Footer {...defaultProps} className="test-class" />
    );
    expect(container.firstChild).toHaveClass('test-class');
  });

  it('renders with correct base styles', () => {
    const { container } = render(<Footer {...defaultProps} />);
    expect(container.firstChild).toHaveClass(
      'bg-muted/80',
      'backdrop-blur',
      'shadow-lg',
      'fixed',
      'bottom-0',
      'w-full',
      'border-t',
      'border-border'
    );
  });

  it('renders buttons with correct height', () => {
    render(<Footer {...defaultProps} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveClass('min-h-[4rem]');
    });
  });

  it('renders buttons with correct text size', () => {
    render(<Footer {...defaultProps} />);
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      const label = button.querySelector('span');
      expect(label).toBeTruthy();
      expect(label).toHaveClass('text-sm', 'font-medium');
    });
  });
});
