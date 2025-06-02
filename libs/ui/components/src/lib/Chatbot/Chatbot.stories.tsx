import type { Meta, StoryObj } from '@storybook/react';
import { Chatbot } from './Chatbot';

const meta: Meta<typeof Chatbot> = {
  component: Chatbot,
  title: 'Components/Chatbot',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Chatbot>;

export const Default: Story = {
  args: {},
};

export const WithCustomClass: Story = {
  args: {
    className: 'max-w-xl mx-auto',
  },
};
