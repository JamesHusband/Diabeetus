import { render, screen, fireEvent } from '@testing-library/react';
import { TimeRangeSelector } from './TimeRangeSelector';

describe('TimeRangeSelector', () => {
  const defaultProps = {
    selectedRange: '24h' as const,
    onRangeChange: jest.fn(),
    customRange: {
      from: '2024-01-01',
      to: '2024-01-02',
    },
    onCustomRangeChange: jest.fn(),
  };

  it('renders all time range buttons', () => {
    render(<TimeRangeSelector {...defaultProps} />);
    expect(screen.getByText('6h')).toBeTruthy();
    expect(screen.getByText('12h')).toBeTruthy();
    expect(screen.getByText('24h')).toBeTruthy();
    expect(screen.getByText('3d')).toBeTruthy();
    expect(screen.getByText('7d')).toBeTruthy();
    expect(screen.getByText('Custom')).toBeTruthy();
  });

  it('highlights the selected range button', () => {
    render(<TimeRangeSelector {...defaultProps} />);
    const selectedButton = screen.getByText('24h');
    expect(selectedButton.parentElement).toHaveClass('bg-primary');
  });

  it('calls onRangeChange when a range button is clicked', () => {
    render(<TimeRangeSelector {...defaultProps} />);
    fireEvent.click(screen.getByText('6h'));
    expect(defaultProps.onRangeChange).toHaveBeenCalledWith('6h');
  });

  it('shows custom date inputs when custom range is selected', () => {
    render(<TimeRangeSelector {...defaultProps} selectedRange="custom" />);
    expect(screen.getByLabelText('From')).toBeTruthy();
    expect(screen.getByLabelText('To')).toBeTruthy();
  });

  it('calls onCustomRangeChange when date inputs change', () => {
    render(<TimeRangeSelector {...defaultProps} selectedRange="custom" />);
    const fromInput = screen.getByLabelText('From');
    fireEvent.change(fromInput, {
      target: { value: '2024-01-03' },
    });
    expect(defaultProps.onCustomRangeChange).toHaveBeenCalledWith({
      from: '2024-01-03',
      to: '2024-01-02',
    });
  });
});
