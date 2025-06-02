import type { Meta, StoryObj } from '@storybook/react';
import { ChartDisplay } from './ChartDisplay';

const meta: Meta<typeof ChartDisplay> = {
  component: ChartDisplay,
  title: 'Components/Graph/ChartDisplay',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChartDisplay>;

const mockData = Array.from({ length: 24 }, (_, i) => ({
  value: Math.sin(i / 4) * 3 + 7, // Generate a sine wave around 7
  timestamp: new Date(Date.now() - (24 - i) * 60 * 60 * 1000).toISOString(),
}));

export const Default: Story = {
  args: {
    data: mockData,
    yAxisLabel: 'Value',
    title: 'Sample Chart',
  },
};

export const WithTargetRange: Story = {
  args: {
    data: mockData,
    yAxisLabel: 'Value',
    title: 'Chart with Target Range',
    targetRange: {
      low: 4.0,
      high: 10.0,
    },
  },
};

export const GlucoseExample: Story = {
  args: {
    data: mockData,
    yAxisLabel: 'Glucose Level (mmol/L)',
    title: 'Glucose Readings',
    targetRange: {
      low: 4.0,
      high: 10.0,
    },
  },
};

export const ExerciseExample: Story = {
  args: {
    data: mockData.map((d) => ({
      ...d,
      value: (d.value - 4) * 10, // Convert to exercise minutes
    })),
    yAxisLabel: 'Exercise Duration (minutes)',
    title: 'Daily Exercise',
  },
};
