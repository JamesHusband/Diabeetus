import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  component: Footer,
  title: 'Components/Footer',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    activeTab: 'home',
    onTabChange: (tab: string) => console.log('Tab changed:', tab),
  },
};

export const WithTrendsActive: Story = {
  args: {
    activeTab: 'trends',
    onTabChange: (tab: string) => console.log('Tab changed:', tab),
  },
};

export const WithGlucoseActive: Story = {
  args: {
    activeTab: 'glucose',
    onTabChange: (tab: string) => console.log('Tab changed:', tab),
  },
};

export const WithCarbsActive: Story = {
  args: {
    activeTab: 'carbs',
    onTabChange: (tab: string) => console.log('Tab changed:', tab),
  },
};

export const WithChatActive: Story = {
  args: {
    activeTab: 'chat',
    onTabChange: (tab: string) => console.log('Tab changed:', tab),
  },
};
