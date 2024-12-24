import type { Meta, StoryObj } from '@storybook/react';
import { TimeRangeSelector } from './TimeRangeSelector';

const meta: Meta<typeof TimeRangeSelector> = {
  component: TimeRangeSelector,
  title: 'Components/Graph/TimeRangeSelector',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TimeRangeSelector>;

export const Default: Story = {
  args: {
    selectedRange: '24h',
    customRange: {
      from: new Date(Date.now() - 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      to: new Date().toISOString().split('T')[0],
    },
  },
};

export const CustomSelected: Story = {
  args: {
    selectedRange: 'custom',
    customRange: {
      from: '2024-01-01',
      to: '2024-01-07',
    },
  },
};
