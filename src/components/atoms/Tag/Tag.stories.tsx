import type { Meta, StoryObj } from '@storybook/react';
import { CheckCircle, XCircle, MinusCircle, AlertTriangle, Info, Zap } from 'lucide-react';
import { Tag } from './Tag';

const meta = {
  title: 'Atoms/Tag',
  component: Tag,
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

const statuses = ['positive', 'negative', 'neutral', 'warning', 'information', 'accent'] as const;

const statusLabels: Record<typeof statuses[number], string> = {
  positive: 'Actif',
  negative: 'Erreur',
  neutral: 'Neutre',
  warning: 'Attention',
  information: 'Info',
  accent: 'Nouveau',
};

const statusIcons: Record<typeof statuses[number], typeof CheckCircle> = {
  positive: CheckCircle,
  negative: XCircle,
  neutral: MinusCircle,
  warning: AlertTriangle,
  information: Info,
  accent: Zap,
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {statuses.map((status) => (
        <Tag key={status} label={statusLabels[status]} status={status} />
      ))}
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {statuses.map((status) => (
        <Tag key={status} label={statusLabels[status]} status={status} showDot />
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {statuses.map((status) => (
        <Tag key={status} label={statusLabels[status]} status={status} icon={statusIcons[status]} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Tag label="Default" status="accent" size="default" />
      <Tag label="Compact" status="accent" size="compact" />
    </div>
  ),
};
