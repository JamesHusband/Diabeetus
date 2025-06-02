import { render, screen, fireEvent } from '@testing-library/react';
import { Graph } from './Graph';

const mockData = [
  { value: 5.5, timestamp: '2024-01-01T10:00:00Z' },
  { value: 6.2, timestamp: '2024-01-01T11:00:00Z' },
  { value: 7.1, timestamp: '2024-01-01T12:00:00Z' },
];

describe('Graph', () => {
  it('renders time range buttons', () => {
    render(<Graph data={mockData} />);
    expect(screen.getByText('6h')).toBeTruthy();
    expect(screen.getByText('12h')).toBeTruthy();
    expect(screen.getByText('24h')).toBeTruthy();
    expect(screen.getByText('3d')).toBeTruthy();
    expect(screen.getByText('7d')).toBeTruthy();
    expect(screen.getByText('Custom')).toBeTruthy();
  });

  it('shows custom date inputs when custom range is selected', () => {
    render(<Graph data={mockData} />);
    fireEvent.click(screen.getByText('Custom'));
    expect(screen.getByLabelText('From')).toBeTruthy();
    expect(screen.getByLabelText('To')).toBeTruthy();
  });

  it('displays title when provided', () => {
    const title = 'Test Graph';
    render(<Graph data={mockData} title={title} />);
    expect(screen.getByText(title)).toBeTruthy();
  });

  it('displays y-axis label when provided', () => {
    const yAxisLabel = 'Test Value';
    render(<Graph data={mockData} yAxisLabel={yAxisLabel} />);
    expect(screen.getByText(yAxisLabel)).toBeTruthy();
  });

  it('displays target range lines when provided', () => {
    const targetRange = { low: 4.0, high: 10.0 };
    render(<Graph data={mockData} targetRange={targetRange} />);
    const targetRangeLabels = screen.getAllByText('Target Range');
    expect(targetRangeLabels).toHaveLength(2); // One for high, one for low
  });
});
