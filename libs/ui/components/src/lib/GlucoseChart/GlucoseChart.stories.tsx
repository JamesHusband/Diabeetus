import type { Meta, StoryObj } from '@storybook/react';
import { GlucoseChart } from './GlucoseChart';
import {
  GlucoseReading,
  MeasurementColor,
  TrendArrow,
  GlucoseUnit,
} from '@diabetus/shared/types';

const meta: Meta<typeof GlucoseChart> = {
  component: GlucoseChart,
  title: 'Components/GlucoseChart',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof GlucoseChart>;

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

export const Primary: Story = {
  args: {
    readings: generateMockReadings(24),
  },
};

export const WithTargetRange: Story = {
  args: {
    readings: generateMockReadings(24),
    targetRange: {
      low: 4.0,
      high: 10.0,
    },
  },
};

export const HighReadings: Story = {
  args: {
    readings: generateMockReadings(12).map((reading) => ({
      ...reading,
      Value: reading.Value + 5, // Add 5 mmol/L to make readings high
      ValueInMgPerDl: (reading.Value + 5) * 18,
      MeasurementColor: MeasurementColor.High,
      isHigh: true,
      isLow: false,
    })),
  },
};

export const LowReadings: Story = {
  args: {
    readings: generateMockReadings(12).map((reading) => ({
      ...reading,
      Value: reading.Value - 3, // Subtract 3 mmol/L to make readings low
      ValueInMgPerDl: (reading.Value - 3) * 18,
      MeasurementColor: MeasurementColor.Low,
      isHigh: false,
      isLow: true,
    })),
  },
};

export const Empty: Story = {
  args: {
    readings: [],
  },
};

export const SingleReading: Story = {
  args: {
    readings: generateMockReadings(0),
  },
};

export const CustomClassName: Story = {
  args: {
    readings: generateMockReadings(24),
    className: 'custom-chart-class bg-gray-100 p-4 rounded-xl',
  },
};
