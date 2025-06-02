import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'Components/Header',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Loading: Story = {
  args: {
    loading: true,
    error: null,
    patientInfo: null,
  },
};

export const Error: Story = {
  args: {
    loading: false,
    error: 'Failed to load data',
    patientInfo: null,
  },
};

export const WithPatientInfo: Story = {
  args: {
    loading: false,
    error: null,
    patientInfo: {
      firstName: 'John',
      lastName: 'Doe',
      targetLow: 70,
      targetHigh: 180,
    },
  },
};
