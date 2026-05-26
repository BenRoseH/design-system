import type { Meta, StoryObj } from '@storybook/react';
import { Home, Users, Settings, BarChart2, FileText, Bell } from 'lucide-react';
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

export const Expanded: Story = {
  args: { sections, user, defaultCollapsed: false },
};

export const Collapsed: Story = {
  args: { sections, user, defaultCollapsed: true },
};
