import type { Meta, StoryObj } from '@storybook/react';
import { User, Users, BarChart2, Settings, Zap, Bot, ScrollText, Network, Library, Plus, Download, Eye, Pencil, Mail, Trash2 } from 'lucide-react';
import { GlobalLayout } from './GlobalLayout';
import { PageHeader } from '../../molecules/PageHeader/PageHeader';
import { TableHeaderCell } from '../../atoms/Table/TableHeaderCell';
import { TableCell } from '../../atoms/Table/TableCell';
import { TableRow } from '../../atoms/Table/TableRow';
import { TableHeaderRow } from '../../atoms/Table/TableHeaderRow';
import { Tag } from '../../atoms/Tag/Tag';
import { ActionMenu } from '../../atoms/ActionMenu/ActionMenu';
import { Avatar } from '../../atoms/Avatar/Avatar';
import { Select } from '../../atoms/Select/Select';
import { MultiSelect } from '../../atoms/MultiSelect/MultiSelect';
import type { ContextMenuItem } from '../../atoms/ContextMenu/ContextMenu';
import '../../atoms/Table/Table.css';

const meta = {
  title: 'Pages/Table page',
  component: GlobalLayout,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof GlobalLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const sections = [
  {
    label: 'Organisation',
    items: [
      { label: 'Utilisateurs', icon: User, selected: true, onClick: () => {} },
      { label: 'Groupes', icon: Users, onClick: () => {} },
      { label: 'Usages', icon: BarChart2, onClick: () => {} },
    ],
  },
  {
    label: 'Configuration',
    items: [
      { label: 'Paramètres', icon: Settings, onClick: () => {} },
      { label: 'Connecteurs', icon: Zap, onClick: () => {} },
      { label: "Packs d'agents", icon: Bot, onClick: () => {} },
      { label: 'CGU', icon: ScrollText, onClick: () => {} },
    ],
  },
  {
    label: 'Espace souverain',
    items: [
      { label: 'Espaces de travail', icon: Network, onClick: () => {} },
      { label: 'Bases documentaires', icon: Library, onClick: () => {} },
      { label: 'Paramètres', icon: Settings, onClick: () => {} },
    ],
  },
];

const user = {
  firstName: 'Harry',
  lastName: 'Potter',
  company: 'Leroy Merlin',
};

const tableUsers = [
  { id: 1, name: 'Harry Potter', email: 'harry@leroy.com', company: 'Leroy Merlin', status: 'positive' as const, statusLabel: 'Actif' },
  { id: 2, name: 'Hermione Granger', email: 'hermione@leroy.com', company: 'Leroy Merlin', status: 'neutral' as const, statusLabel: 'Inactif' },
  { id: 3, name: 'Ron Weasley', email: 'ron@leroy.com', company: 'Leroy Merlin', status: 'warning' as const, statusLabel: 'En attente' },
];

const rowMenuItems: ContextMenuItem[] = [
  { type: 'item', label: 'Voir le profil', icon: Eye },
  { type: 'item', label: 'Modifier', icon: Pencil },
  { type: 'item', label: "Copier l'email", icon: Mail },
  { type: 'separator' },
  { type: 'item', label: "Supprimer l'utilisateur", icon: Trash2, destructive: true },
];

const UsersTable = () => (
  <div className="table-container">
    <div className="table-toolbar">
      <MultiSelect
        size="compact"
        label="Statut"
        options={[{ value: 'active', label: 'Actif' }, { value: 'inactive', label: 'Inactif' }, { value: 'pending', label: 'En attente' }]}
      />
      <Select
        size="compact"
        options={[{ value: 'all', label: 'Toutes les entreprises' }, { value: 'leroy', label: 'Leroy Merlin' }, { value: 'adeo', label: 'Adeo' }]}
        defaultValue="all"
      />
      <Select
        size="compact"
        options={[{ value: 'all', label: 'Tous les rôles' }, { value: 'admin', label: 'Administrateur' }, { value: 'user', label: 'Utilisateur' }]}
        defaultValue="all"
      />
    </div>
    <table>
      <thead>
        <TableHeaderRow>
          <TableHeaderCell>Nom</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Entreprise</TableHeaderCell>
          <TableHeaderCell>Statut</TableHeaderCell>
          <th style={{ width: 48 }} />
        </TableHeaderRow>
      </thead>
      <tbody>
        {tableUsers.map((u) => (
          <TableRow key={u.id} onClick={() => {}}>
            <TableCell>
              <div className="table-cell__with-avatar">
                <Avatar fallback={u.name.split(' ').map(n => n[0]).join('')} size="compact" />
                {u.name}
              </div>
            </TableCell>
            <TableCell>{u.email}</TableCell>
            <TableCell>{u.company}</TableCell>
            <TableCell>
              <Tag label={u.statusLabel} status={u.status} size="compact" showDot />
            </TableCell>
            <TableCell align="right">
              <ActionMenu items={rowMenuItems} />
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </table>
  </div>
);

export const Default: Story = {
  render: () => (
    <GlobalLayout sections={sections} user={user}>
      <PageHeader
        title="Utilisateurs"
        description="Créez et modifiez les utilisateurs de Live Intelligence."
      />
      <UsersTable />
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
      <UsersTable />
    </GlobalLayout>
  ),
};
