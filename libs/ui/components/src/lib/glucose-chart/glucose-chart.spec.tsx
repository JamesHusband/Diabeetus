import { render } from '@testing-library/react';
import { GlucoseChart } from './glucose-chart';
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
});
