/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  const mockOnTabChange = jest.fn();

  beforeEach(() => {
    mockOnTabChange.mockClear();
  });

  it('renders all navigation buttons', () => {
    render(<Footer activeTab="home" onTabChange={mockOnTabChange} />);
    // Check if all buttons are present
    expect(screen.getByRole('button', { name: /home/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /trends/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /glucose/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /carbs/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /chat/i })).toBeTruthy();
  });

  it('applies active styles to current tab', () => {
    render(<Footer activeTab="home" onTabChange={mockOnTabChange} />);
    // Check class names directly
    const homeButton = screen.getByRole('button', { name: /home/i });
    const trendsButton = screen.getByRole('button', { name: /trends/i });
    expect(homeButton.className).toContain('text-blue-500');
    expect(trendsButton.className).toContain('text-gray-500');
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
