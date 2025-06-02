import { render, screen, fireEvent } from '@testing-library/react';
import { NotificationBadge } from './NotificationBadge';

describe('NotificationBadge', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders notification button', () => {
    render(<NotificationBadge count={0} onClick={mockOnClick} />);
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('shows badge when count is greater than 0', () => {
    render(<NotificationBadge count={3} onClick={mockOnClick} />);
    expect(screen.getByText('3')).toBeTruthy();
  });

  it('hides badge when count is 0', () => {
    const { container } = render(
      <NotificationBadge count={0} onClick={mockOnClick} />
    );
    expect(container.querySelector('.absolute')).toBeNull();
  });

  it('calls onClick when button is clicked', () => {
    render(<NotificationBadge count={3} onClick={mockOnClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
