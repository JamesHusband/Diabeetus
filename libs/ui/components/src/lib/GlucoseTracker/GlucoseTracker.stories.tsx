import type { Meta, StoryObj } from '@storybook/react';
import { GlucoseTracker } from './GlucoseTracker';
import {
  GlucoseReading,
  MeasurementColor,
  TrendArrow,
  GlucoseUnit,
} from '@diabetus/shared/types';

const meta: Meta<typeof GlucoseTracker> = {
  component: GlucoseTracker,
  title: 'Components/GlucoseTracker',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof GlucoseTracker>;

// Generate mock readings for the last 24 hours
const generateMockReadings = (hours: number): GlucoseReading[] => {
  const readings: GlucoseReading[] = [];
  const now = new Date();

  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 30 * 60 * 1000); // Every 30 minutes
    const value = 5 + Math.sin(i / 3) * 2; // Generate a sine wave pattern

    readings.push({
      FactoryTimestamp: timestamp.toISOString(),
      Timestamp: timestamp.toISOString(),
      type: 1,
      ValueInMgPerDl: value * 18, // Convert to mg/dL
      TrendArrow: TrendArrow.Stable,
      TrendMessage: null,
      MeasurementColor:
        value < 4
          ? MeasurementColor.Low
          : value > 10
          ? MeasurementColor.High
          : MeasurementColor.InRange,
      GlucoseUnits: GlucoseUnit.MmolL,
      Value: value,
      isHigh: value > 10,
      isLow: value < 4,
    });
  }

  return readings;
};

const mockPatientInfo = {
  id: '123',
  patientId: '456',
  firstName: 'John',
  lastName: 'Doe',
  country: 'US',
  status: 'active',
  targetLow: 70,
  targetHigh: 180,
  glucoseUnit: 'mg/dL',
  uom: 'mg/dL',
  sensor: 'libre',
  glucoseMeasurement: 'mmol/L',
};

const mockReadings = generateMockReadings(24);

export const Loading: Story = {
  args: {
    loading: true,
    error: null,
    readings: [],
    latestReading: null,
    patientInfo: null,
  },
};

export const Error: Story = {
  args: {
    loading: false,
    error: 'Failed to load data',
    readings: [],
    latestReading: null,
    patientInfo: null,
  },
};

export const WithData: Story = {
  args: {
    loading: false,
    error: null,
    readings: mockReadings,
    latestReading: mockReadings[0],
    patientInfo: mockPatientInfo,
  },
};

export const NoReadings: Story = {
  args: {
    loading: false,
    error: null,
    readings: [],
    latestReading: null,
    patientInfo: mockPatientInfo,
  },
};
