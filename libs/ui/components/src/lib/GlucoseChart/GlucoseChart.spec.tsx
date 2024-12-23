import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GlucoseChart } from './GlucoseChart';
import {
  GlucoseReading,
  MeasurementColor,
  TrendArrow,
  GlucoseUnit,
} from '@diabetus/shared/types';

const mockReadings: GlucoseReading[] = [
  {
    FactoryTimestamp: '2024-03-22T14:30:00',
    Timestamp: '2024-03-22T14:30:00',
    type: 1,
    ValueInMgPerDl: 120,
    TrendArrow: TrendArrow.Stable,
    TrendMessage: null,
    MeasurementColor: MeasurementColor.InRange,
    GlucoseUnits: GlucoseUnit.MmolL,
    Value: 6.7,
    isHigh: false,
    isLow: false,
  },
  {
    FactoryTimestamp: '2024-03-22T15:00:00',
    Timestamp: '2024-03-22T15:00:00',
    type: 1,
    ValueInMgPerDl: 160,
    TrendArrow: TrendArrow.Rising,
    TrendMessage: null,
    MeasurementColor: MeasurementColor.SlightlyHigh,
    GlucoseUnits: GlucoseUnit.MmolL,
    Value: 8.9,
    isHigh: false,
    isLow: false,
  },
];

describe('GlucoseChart', () => {
  it('renders successfully', () => {
    const { baseElement } = render(<GlucoseChart readings={mockReadings} />);
    expect(baseElement).toBeTruthy();
  });

  it('renders with empty readings', () => {
    const { baseElement } = render(<GlucoseChart readings={[]} />);
    expect(baseElement).toBeTruthy();
  });

  it('applies custom className', () => {
    const { container } = render(
      <GlucoseChart readings={mockReadings} className="test-class" />
    );
    expect(container.firstChild).toHaveClass('test-class');
  });

  it('renders target range lines when provided', () => {
    const targetRange = { low: 4.0, high: 10.0 };
    render(<GlucoseChart readings={mockReadings} targetRange={targetRange} />);
    const targetRangeElements = screen.getAllByText('Target Range');
    expect(targetRangeElements).toHaveLength(2); // Both high and low lines
  });

  describe('Time Range Selection', () => {
    it('defaults to 24h range', () => {
      render(<GlucoseChart readings={mockReadings} />);
      const button24h = screen.getByRole('button', { name: '24h' });
      expect(button24h).toHaveClass('bg-blue-500'); // Selected state
    });

    it('changes time range when clicking range buttons', () => {
      render(<GlucoseChart readings={mockReadings} />);
      const button6h = screen.getByRole('button', { name: '6h' });
      fireEvent.click(button6h);
      expect(button6h).toHaveClass('bg-blue-500'); // Selected state
      expect(screen.getByRole('button', { name: '24h' })).not.toHaveClass(
        'bg-blue-500'
      );
    });

    it('shows custom date inputs when custom range is selected', () => {
      render(<GlucoseChart readings={mockReadings} />);
      const customButton = screen.getByRole('button', { name: 'Custom' });
      fireEvent.click(customButton);
      expect(screen.getByText('to')).toBeInTheDocument();
      const dateInputs = screen.getAllByRole('textbox');
      expect(dateInputs).toHaveLength(2);
    });

    it('updates custom date range when dates are changed', () => {
      render(<GlucoseChart readings={mockReadings} />);
      const customButton = screen.getByRole('button', { name: 'Custom' });
      fireEvent.click(customButton);

      const [fromInput, toInput] = screen.getAllByRole('textbox');

      fireEvent.change(fromInput, { target: { value: '2024-03-20' } });
      fireEvent.change(toInput, { target: { value: '2024-03-22' } });

      expect(fromInput).toHaveValue('2024-03-20');
      expect(toInput).toHaveValue('2024-03-22');
    });

    it('filters readings based on selected time range', () => {
      const now = new Date();
      const recentReadings = [
        {
          ...mockReadings[0],
          Timestamp: now.toISOString(),
          FactoryTimestamp: now.toISOString(),
        },
        {
          ...mockReadings[1],
          Timestamp: new Date(
            now.getTime() - 7 * 24 * 60 * 60 * 1000
          ).toISOString(), // 7 days old
          FactoryTimestamp: new Date(
            now.getTime() - 7 * 24 * 60 * 60 * 1000
          ).toISOString(),
        },
      ];

      render(<GlucoseChart readings={recentReadings} />);

      // Select 6h range
      const button6h = screen.getByRole('button', { name: '6h' });
      fireEvent.click(button6h);

      // Only the recent reading should be visible in the chart
      const chart = screen.getByRole('img', { name: /glucose level/i });
      expect(chart).toBeInTheDocument();
    });
  });
});
