import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  args: {
    fallback: 'LT',
    size: 'default',
    delay: 600,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'compact'],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80',
    alt: 'Photo de profil',
    fallback: 'LT',
  },
};

export const Fallback: Story = {
  args: {
    fallback: 'LT',
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Avatar {...args} size="default" />
      <Avatar {...args} size="compact" />
    </div>
  ),
  args: { fallback: 'LT' },
};

export const AllStates: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Avatar
        {...args}
        src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80"
        alt="Photo de profil"
        fallback="LT"
      />
      <Avatar {...args} fallback="LT" />
      <Avatar {...args} fallback="AB" />
    </div>
  ),
};
