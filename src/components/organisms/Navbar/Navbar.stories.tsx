import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';

const meta = {
  title: 'Organisms/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const user = {
  firstName: 'Harry',
  lastName: 'Potter',
  company: 'Leroy Merlin',
};

export const Expanded: Story = {
  args: { user, defaultCollapsed: false },
};

export const Collapsed: Story = {
  args: { user, defaultCollapsed: true },
};
