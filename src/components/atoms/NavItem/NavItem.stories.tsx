import type { Meta, StoryObj } from '@storybook/react';
import { Home, Users, Settings, BarChart2 } from 'lucide-react';
import { NavItem } from './NavItem';

const meta = {
  title: 'Atoms/NavItem',
  component: NavItem,
  args: {
    label: 'Label',
    icon: Home,
  },
} satisfies Meta<typeof NavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Hover: Story = {
  parameters: { pseudo: { hover: true } },
};

export const Selected: Story = {
  args: { selected: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Focus: Story = {
  parameters: { pseudo: { focusVisible: true } },
};

export const Active: Story = {
  args: { selected: true },
  parameters: { pseudo: { hover: true } },
};

export const IconOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <NavItem icon={Home} aria-label="Accueil" />
      <NavItem icon={Users} aria-label="Utilisateurs" selected />
      <NavItem icon={Settings} aria-label="Paramètres" disabled />
      <NavItem icon={BarChart2} aria-label="Statistiques" />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '200px auto', gap: 8, alignItems: 'center' }}>
      <NavItem icon={Home} label="Label" />
      <NavItem icon={Home} aria-label="Accueil" />

      <NavItem icon={Home} label="Label" selected={false} />
      <NavItem icon={Home} aria-label="Accueil" />

      <NavItem icon={Home} label="Label" selected />
      <NavItem icon={Home} aria-label="Accueil" selected />

      <NavItem icon={Home} label="Label" disabled />
      <NavItem icon={Home} aria-label="Accueil" disabled />
    </div>
  ),
};
