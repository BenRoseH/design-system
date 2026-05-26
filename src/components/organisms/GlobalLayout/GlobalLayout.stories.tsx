import type { Meta, StoryObj } from '@storybook/react';
import { GlobalLayout } from './GlobalLayout';

const meta = {
  title: 'Organisms/GlobalLayout',
  component: GlobalLayout,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GlobalLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
