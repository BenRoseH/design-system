import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';
import { Avatar, type DecorativeColor } from '../Avatar/Avatar';
import { Tag } from '../Tag/Tag';
import { Text } from '../Text/Text';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import type { ColumnConfig } from '../../../types/column';
import type { ContextMenuItem } from '../ContextMenu/ContextMenu';
import { useUsers } from '../../../hooks/useUsers';
import { usersColumns } from '../../../pages/Users/users.columns';
import './Table.css';

const meta = {
  title: 'Atoms/Table',
  component: Table,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

type User = {
  id: number;
  name: string;
  email: string;
  company: string;
  status: 'positive' | 'neutral' | 'warning';
  statusLabel: string;
  colorDecoration: DecorativeColor;
};

const users: User[] = [
  { id: 1, name: 'Harry Potter',     email: 'harry@leroy.com',    company: 'Leroy Merlin', status: 'positive', statusLabel: 'Actif',      colorDecoration: 'blue'   },
  { id: 2, name: 'Hermione Granger', email: 'hermione@leroy.com', company: 'Leroy Merlin', status: 'neutral',  statusLabel: 'Inactif',    colorDecoration: 'purple' },
  { id: 3, name: 'Ron Weasley',      email: 'ron@leroy.com',      company: 'Leroy Merlin', status: 'warning',  statusLabel: 'En attente', colorDecoration: 'brown'  },
];

const rowMenuItems: ContextMenuItem[] = [
  { type: 'item', label: 'Voir', icon: Eye },
  { type: 'item', label: 'Modifier', icon: Pencil },
  { type: 'separator' },
  { type: 'item', label: 'Supprimer', icon: Trash2, destructive: true },
];

const columns: ColumnConfig<User>[] = [
  {
    key: 'name',
    label: 'Nom',
    visible: true,
    render: (row) => (
      <div className="table-cell__with-avatar">
        <Avatar fallback={row.name.split(' ').map(n => n[0]).join('')} size="compact" colorDecoration={row.colorDecoration} />
        <Text as="span" variant="body-medium-default">{row.name}</Text>
      </div>
    ),
  },
  { key: 'email',   label: 'Email',     visible: true  },
  { key: 'company', label: 'Entreprise', visible: true  },
  {
    key: 'status',
    label: 'Statut',
    visible: true,
    render: (row) => <Tag label={row.statusLabel} status={row.status} size="compact" showDot />,
  },
];

const columnsWithHidden: ColumnConfig<User>[] = columns.map((c) =>
  c.key === 'company' ? { ...c, visible: false } : c
);

export const Default: Story = {
  args: { columns, data: users, rowActions: rowMenuItems },
};

export const WithHiddenColumn: Story = {
  args: { columns: columnsWithHidden, data: users, rowActions: rowMenuItems },
};

export const Loading: Story = {
  args: { columns, data: [], loading: true },
};

export const Empty: Story = {
  args: { columns, data: [], emptyMessage: 'Aucun utilisateur trouvé.' },
};

export const WithError: Story = {
  args: { columns, data: [], error: 'Une erreur est survenue lors du chargement.' },
};

export const Live: Story = {
  args: { columns: [], data: [] },
  render: () => {
    const { data: users, isLoading, error } = useUsers();
    return (
      <Table
        columns={usersColumns}
        data={users ?? []}
        loading={isLoading}
        error={error ? 'Erreur de chargement des utilisateurs.' : undefined}
        emptyMessage="Aucun utilisateur trouvé."
        rowActions={rowMenuItems}
      />
    );
  },
};
