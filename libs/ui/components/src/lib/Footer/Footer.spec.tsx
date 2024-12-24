import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from './Footer';

describe('Footer', () => {
  const mockOnTabChange = jest.fn();

  beforeEach(() => {
    mockOnTabChange.mockClear();
  });

  it('renders all navigation buttons', () => {
    render(<Footer activeTab="home" onTabChange={mockOnTabChange} />);
    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /trends/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /glucose/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /carbs/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /chat/i })).toBeInTheDocument();
  });

  it('applies active styles to current tab', () => {
    render(<Footer activeTab="home" onTabChange={mockOnTabChange} />);
    expect(screen.getByRole('button', { name: /home/i })).toHaveClass(
      'text-blue-500'
    );
    expect(screen.getByRole('button', { name: /trends/i })).toHaveClass(
      'text-gray-500'
    );
  });

  it('calls onTabChange when clicking a tab', () => {
    render(<Footer activeTab="home" onTabChange={mockOnTabChange} />);
    fireEvent.click(screen.getByRole('button', { name: /trends/i }));
    expect(mockOnTabChange).toHaveBeenCalledWith('trends');
  });

  it('handles all tab changes correctly', () => {
    render(<Footer activeTab="home" onTabChange={mockOnTabChange} />);

    const tabs = ['home', 'trends', 'glucose', 'carbs', 'chat'];
    tabs.forEach((tab) => {
      fireEvent.click(
        screen.getByRole('button', { name: new RegExp(tab, 'i') })
      );
      expect(mockOnTabChange).toHaveBeenCalledWith(tab);
    });
    expect(mockOnTabChange).toHaveBeenCalledTimes(5);
  });
});
