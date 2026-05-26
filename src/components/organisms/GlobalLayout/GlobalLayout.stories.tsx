import type { Meta, StoryObj } from '@storybook/react';
import { Home, Users, Settings, BarChart2, FileText, Bell, Plus, Download } from 'lucide-react';
import { GlobalLayout } from './GlobalLayout';
import { PageHeader } from '../../molecules/PageHeader/PageHeader';

const meta = {
  title: 'Organisms/GlobalLayout',
  component: GlobalLayout,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GlobalLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const sections = [
  {
    label: 'Application',
    items: [
      { label: 'Accueil', icon: Home, selected: true, onClick: () => {} },
      { label: 'Utilisateurs', icon: Users, onClick: () => {} },
      { label: 'Rapports', icon: FileText, onClick: () => {} },
    ],
  },
  {
    label: 'Paramètres',
    items: [
      { label: 'Statistiques', icon: BarChart2, onClick: () => {} },
      { label: 'Notifications', icon: Bell, onClick: () => {} },
      { label: 'Configuration', icon: Settings, onClick: () => {} },
    ],
  },
];

const user = {
  firstName: 'Harry',
  lastName: 'Potter',
  company: 'Leroy Merlin',
};

export const Default: Story = {
  render: () => (
    <GlobalLayout sections={sections} user={user}>
      <PageHeader
        title="Utilisateurs"
        description="Créez et modifiez les utilisateurs de Live Intelligence."
      />
    </GlobalLayout>
  ),
};

export const Playground: Story = {
  args: {
    pageTitle: 'Utilisateurs',
    pageDescription: 'Créez et modifiez les utilisateurs de Live Intelligence.',
    showPrimaryAction: true,
    primaryActionLabel: 'Nouvel utilisateur',
    showSecondaryAction: false,
    secondaryActionLabel: 'Exporter',
  } as any,
  argTypes: {
    pageTitle: { control: 'text', name: 'Titre' },
    pageDescription: { control: 'text', name: 'Description' },
    showPrimaryAction: { control: 'boolean', name: 'Action primaire' },
    primaryActionLabel: { control: 'text', name: 'Label action primaire' },
    showSecondaryAction: { control: 'boolean', name: 'Action secondaire' },
    secondaryActionLabel: { control: 'text', name: 'Label action secondaire' },
  } as any,
  render: (args: any) => (
    <GlobalLayout sections={sections} user={user}>
      <PageHeader
        title={args.pageTitle}
        description={args.pageDescription}
        primaryAction={args.showPrimaryAction ? {
          label: args.primaryActionLabel,
          icon: Plus,
          onClick: () => {},
        } : undefined}
        secondaryAction={args.showSecondaryAction ? {
          label: args.secondaryActionLabel,
          icon: Download,
          onClick: () => {},
        } : undefined}
      />
    </GlobalLayout>
  ),
};
