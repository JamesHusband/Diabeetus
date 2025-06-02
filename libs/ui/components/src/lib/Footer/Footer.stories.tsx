import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  component: Footer,
  title: 'Components/Footer',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="h-[200px] relative">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Footer>;

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
