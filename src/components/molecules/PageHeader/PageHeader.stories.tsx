import type { Meta, StoryObj } from '@storybook/react';
import { Upload, Plus, Search, Download, Pencil, Settings, Trash2, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PageHeader } from './PageHeader';

const iconMap: Record<string, LucideIcon | undefined> = {
  none: undefined,
  Plus,
  Upload,
  Search,
  Download,
  Pencil,
  Settings,
  Trash2,
  X,
};

type PlaygroundArgs = {
  title: string;
  description: string;
  showPrimary: boolean;
  primaryLabel: string;
  primaryIcon: string;
  showSecondary: boolean;
  secondaryLabel: string;
  secondaryIcon: string;
};

const meta: Meta = {
  title: 'Molecules/PageHeader',
  parameters: { layout: 'padded' },
};

export default meta;

export const Default: StoryObj<PlaygroundArgs> = {
  args: {
    title: 'Utilisateurs',
    description: 'Créez et modifiez les utilisateurs de Live Intelligence.',
    showPrimary: true,
    primaryLabel: 'Label',
    primaryIcon: 'none',
    showSecondary: false,
    secondaryLabel: 'Label',
    secondaryIcon: 'none',
  },
  argTypes: {
    primaryIcon: { control: 'select', options: Object.keys(iconMap) },
    secondaryIcon: { control: 'select', options: Object.keys(iconMap) },
  },
  render: ({ title, description, showPrimary, primaryLabel, primaryIcon, showSecondary, secondaryLabel, secondaryIcon }) => (
    <PageHeader
      title={title}
      description={description}
      primaryAction={showPrimary ? {
        label: primaryLabel,
        icon: iconMap[primaryIcon],
        onClick: () => {},
      } : undefined}
      secondaryAction={showSecondary ? {
        label: secondaryLabel,
        icon: iconMap[secondaryIcon],
        onClick: () => {},
      } : undefined}
    />
  ),
};

export const TitleOnly: StoryObj<PlaygroundArgs> = {
  render: () => (
    <PageHeader title="Utilisateurs" />
  ),
};

export const WithDescription: StoryObj<PlaygroundArgs> = {
  render: () => (
    <PageHeader
      title="Utilisateurs"
      description="Créez et modifiez les utilisateurs de Live Intelligence."
    />
  ),
};

export const WithPrimaryAction: StoryObj<PlaygroundArgs> = {
  render: () => (
    <PageHeader
      title="Utilisateurs"
      description="Créez et modifiez les utilisateurs de Live Intelligence."
      primaryAction={{ label: 'Ajouter un client', icon: Plus, onClick: () => {} }}
    />
  ),
};

export const WithTwoActions: StoryObj<PlaygroundArgs> = {
  render: () => (
    <PageHeader
      title="Utilisateurs"
      description="Créez et modifiez les utilisateurs de Live Intelligence."
      secondaryAction={{ label: 'Importer des utilisateurs', icon: Upload, onClick: () => {} }}
      primaryAction={{ label: 'Ajouter un client', icon: Plus, onClick: () => {} }}
    />
  ),
};
