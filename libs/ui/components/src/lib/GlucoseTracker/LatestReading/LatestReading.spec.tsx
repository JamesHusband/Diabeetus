import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LatestReading } from './LatestReading';
import { LogbookEntry, PatientInfo } from '@diabetus/shared/types';

describe('LatestReading', () => {
  const mockReading: LogbookEntry = {
    Value: 7.2,
    Timestamp: '2024-01-01T12:00:00Z',
    FactoryTimestamp: '2024-01-01T12:00:00Z',
    type: 1,
    ValueInMgPerDl: 130,
    TrendArrow: 3,
    TrendMessage: null,
    MeasurementColor: 1,
    GlucoseUnits: 0,
    isHigh: false,
    isLow: false,
  };

  const mockPatientInfo: PatientInfo = {
    id: '123',
    patientId: '456',
    country: 'UK',
    status: 1,
    firstName: 'John',
    lastName: 'Doe',
    targetLow: 4.0,
    targetHigh: 10.0,
    uom: 0,
    sensor: {
      deviceId: 'device123',
      sn: 'serial123',
      a: 1,
      w: 1,
      pt: 1,
      s: false,
      lj: false,
    },
    glucoseMeasurement: mockReading,
  };

  it('renders glucose level and timestamp', () => {
    render(
      <LatestReading reading={mockReading} patientInfo={mockPatientInfo} />
    );

    expect(screen.getByText('7.2 mmol/L')).toBeInTheDocument();
    expect(screen.getByText(/Glucose Level/)).toBeInTheDocument();
    expect(
      screen.getByText(new Date(mockReading.Timestamp).toLocaleString())
    ).toBeInTheDocument();
  });

  it('renders target range', () => {
    render(
      <LatestReading reading={mockReading} patientInfo={mockPatientInfo} />
    );

    expect(screen.getByText('Target Range')).toBeInTheDocument();
    expect(screen.getByText('4.0 - 10.0 mmol/L')).toBeInTheDocument();
  });

  it('renders with correct layout', () => {
    render(
      <LatestReading reading={mockReading} patientInfo={mockPatientInfo} />
    );

    const gridContainer = screen.getByTestId('latest-reading-grid');
    expect(gridContainer).toHaveClass('grid-cols-2', 'gap-4');
  });
});
