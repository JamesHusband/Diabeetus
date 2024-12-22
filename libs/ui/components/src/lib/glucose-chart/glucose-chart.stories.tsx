import type { Meta, StoryObj } from '@storybook/react';
import { GlucoseChart } from './glucose-chart';
import {
  GlucoseReading,
  MeasurementColor,
  TrendArrow,
  GlucoseUnit,
} from '@diabetus/shared/types';

const meta: Meta<typeof GlucoseChart> = {
  component: GlucoseChart,
  title: 'GlucoseChart',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GlucoseChart>;

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
  {
    FactoryTimestamp: '2024-03-22T15:30:00',
    Timestamp: '2024-03-22T15:30:00',
    type: 1,
    ValueInMgPerDl: 200,
    TrendArrow: TrendArrow.RisingQuickly,
    TrendMessage: null,
    MeasurementColor: MeasurementColor.High,
    GlucoseUnits: GlucoseUnit.MmolL,
    Value: 11.1,
    isHigh: true,
    isLow: false,
  },
  {
    FactoryTimestamp: '2024-03-22T16:00:00',
    Timestamp: '2024-03-22T16:00:00',
    type: 1,
    ValueInMgPerDl: 180,
    TrendArrow: TrendArrow.Falling,
    TrendMessage: null,
    MeasurementColor: MeasurementColor.SlightlyHigh,
    GlucoseUnits: GlucoseUnit.MmolL,
    Value: 10.0,
    isHigh: false,
    isLow: false,
  },
  {
    FactoryTimestamp: '2024-03-22T16:30:00',
    Timestamp: '2024-03-22T16:30:00',
    type: 1,
    ValueInMgPerDl: 70,
    TrendArrow: TrendArrow.FallingQuickly,
    TrendMessage: null,
    MeasurementColor: MeasurementColor.Low,
    GlucoseUnits: GlucoseUnit.MmolL,
    Value: 3.9,
    isHigh: false,
    isLow: true,
  },
];

export const Primary: Story = {
  args: {
    readings: mockReadings,
  },
};

export const Empty: Story = {
  args: {
    readings: [],
  },
};
