import type { Meta, StoryObj } from '@storybook/react';
import { NavigationButtons } from './NavigationButtons';

const meta: Meta<typeof NavigationButtons> = {
  component: NavigationButtons,
  title: 'Components/Footer/NavigationButtons',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NavigationButtons>;

export const Default: Story = {
  args: {
    activeSection: 'home',
  },
};

export const TrendsActive: Story = {
  args: {
    activeSection: 'trends',
  },
};

export const GlucoseActive: Story = {
  args: {
    activeSection: 'glucose',
  },
};

export const CarbsActive: Story = {
  args: {
    activeSection: 'carbs',
  },
};

export const ChatActive: Story = {
  args: {
    activeSection: 'chat',
  },
};
