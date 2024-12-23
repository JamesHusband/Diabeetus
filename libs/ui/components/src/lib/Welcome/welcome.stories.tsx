import type { Meta, StoryObj } from '@storybook/react';
import { Welcome } from './welcome';

const meta: Meta<typeof Welcome> = {
  component: Welcome,
  title: 'Components/Welcome',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Welcome>;

export const Default: Story = {
  args: {
    project: 'NX Strap',
  },
};

export const CustomProject: Story = {
  args: {
    project: 'My Awesome Project',
  },
};
