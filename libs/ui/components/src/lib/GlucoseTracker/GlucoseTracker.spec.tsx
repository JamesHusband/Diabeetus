import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GlucoseTracker } from './GlucoseTracker';
import {
  GlucoseReading,
  MeasurementColor,
  TrendArrow,
  GlucoseUnit,
} from '@diabetus/shared/types';

const mockPatientInfo = {
  id: '123',
  patientId: '456',
  firstName: 'John',
  lastName: 'Doe',
  country: 'US',
  status: 1,
  targetLow: 70,
  targetHigh: 180,
  glucoseUnit: 'mg/dL',
  uom: 'mg/dL',
  sensor: 'libre',
  glucoseMeasurement: 'mmol/L',
};

const mockReading: GlucoseReading = {
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
};

describe('GlucoseTracker', () => {
  it('renders loading state', () => {
    render(
      <GlucoseTracker
        loading={true}
        error={null}
        readings={[]}
        latestReading={null}
        patientInfo={null}
      />
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    const error = 'Failed to load data';
    render(
      <GlucoseTracker
        loading={false}
        error={error}
        readings={[]}
        latestReading={null}
        patientInfo={null}
      />
    );
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it('renders no readings message', () => {
    render(
      <GlucoseTracker
        loading={false}
        error={null}
        readings={[]}
        latestReading={null}
        patientInfo={mockPatientInfo}
      />
    );
    expect(
      screen.getByText('No glucose readings available')
    ).toBeInTheDocument();
  });

  it('renders glucose chart and latest reading', () => {
    render(
      <GlucoseTracker
        loading={false}
        error={null}
        readings={[mockReading]}
        latestReading={mockReading}
        patientInfo={mockPatientInfo}
      />
    );
    expect(screen.getByText('Glucose Level Tracker')).toBeInTheDocument();
    expect(screen.getByText('Latest Reading')).toBeInTheDocument();
    expect(screen.getByText('6.7')).toBeInTheDocument();
    expect(screen.getByText('mmol/L')).toBeInTheDocument();
  });
});
