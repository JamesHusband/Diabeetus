import { render } from '@testing-library/react';
import { ChartDisplay } from './ChartDisplay';

const mockData = [
  { value: 5.5, timestamp: '2024-01-01T10:00:00Z' },
  { value: 6.2, timestamp: '2024-01-01T11:00:00Z' },
  { value: 7.1, timestamp: '2024-01-01T12:00:00Z' },
];

describe('ChartDisplay', () => {
  it('renders without crashing', () => {
    const { container } = render(<ChartDisplay data={mockData} />);
    expect(container.querySelector('canvas')).toBeTruthy();
  });

  it('renders with target range', () => {
    const targetRange = { low: 4.0, high: 10.0 };
    const { container } = render(
      <ChartDisplay data={mockData} targetRange={targetRange} />
    );
    expect(container.querySelector('canvas')).toBeTruthy();
  });

  it('renders with custom y-axis label', () => {
    const yAxisLabel = 'Test Value';
    const { container } = render(
      <ChartDisplay data={mockData} yAxisLabel={yAxisLabel} />
    );
    expect(container.querySelector('canvas')).toBeTruthy();
  });

  it('renders with title', () => {
    const title = 'Test Graph';
    const { container } = render(
      <ChartDisplay data={mockData} title={title} />
    );
    expect(container.querySelector('canvas')).toBeTruthy();
  });
});
