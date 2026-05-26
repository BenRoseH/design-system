import type { Meta, StoryObj } from '@storybook/react';
import {
  ArrowRight, ArrowLeft, Plus, Trash2, Settings,
  Search, Download, Upload, Pencil, X,
} from 'lucide-react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'label',
    hierarchy: 'default',
    size: 'default',
    layout: 'text',
    disabled: false,
    loading: false,
  },
  argTypes: {
    hierarchy: {
      control: 'select',
      options: ['default', 'strong', 'negative', 'brand', 'minimal'],
    },
    size: {
      control: 'select',
      options: ['default', 'compact'],
    },
    layout: {
      control: 'select',
      options: ['text', 'text-icon', 'icon-text', 'icon-only'],
    },
    icon: {
      control: 'select',
      options: ['none', 'ArrowRight', 'ArrowLeft', 'Plus', 'Trash2', 'Settings', 'Search', 'Download', 'Upload', 'Pencil', 'X'],
      mapping: {
        none: undefined,
        ArrowRight,
        ArrowLeft,
        Plus,
        Trash2,
        Settings,
        Search,
        Download,
        Upload,
        Pencil,
        X,
      },
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { hierarchy: 'default' },
};

export const Strong: Story = {
  args: { hierarchy: 'strong' },
};

export const Negative: Story = {
  args: { hierarchy: 'negative' },
};

export const Brand: Story = {
  args: { hierarchy: 'brand' },
};

export const Minimal: Story = {
  args: { hierarchy: 'minimal' },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Button {...args} size="default">label</Button>
      <Button {...args} size="compact">label</Button>
    </div>
  ),
  args: { hierarchy: 'brand' },
};

export const AllLayouts: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Button {...args} layout="text">label</Button>
      <Button {...args} layout="text-icon" icon={ArrowRight}>label</Button>
      <Button {...args} layout="icon-text" icon={ArrowRight}>label</Button>
      <Button {...args} layout="icon-only" icon={ArrowRight} aria-label="Suivant" />
    </div>
  ),
  args: { hierarchy: 'brand' },
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Button {...args}>enabled</Button>
      <Button {...args} disabled>disabled</Button>
      <Button {...args} loading>loading</Button>
    </div>
  ),
  args: { hierarchy: 'brand' },
};
