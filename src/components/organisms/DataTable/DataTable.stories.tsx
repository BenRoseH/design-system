import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';
import { Avatar, type DecorativeColor } from '../../atoms/Avatar/Avatar';
import { Tag } from '../../atoms/Tag/Tag';
import { Text } from '../../atoms/Text/Text';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import type { ColumnConfig } from '../../../types/column';
import type { ContextMenuItem } from '../../atoms/ContextMenu/ContextMenu';

const meta = {
  title: 'Organisms/DataTable',
  component: DataTable,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  statusLabel: string;
  colorDecoration: DecorativeColor;
};

const users: User[] = [
  { id: 1, name: 'Harry Potter',       email: 'harry@leroy.com',    role: 'Administrateur', status: 'Actif',              statusLabel: 'Actif',              colorDecoration: 'blue'   },
  { id: 2, name: 'Hermione Granger',   email: 'hermione@leroy.com', role: 'Utilisateur',    status: 'Actif',              statusLabel: 'Actif',              colorDecoration: 'purple' },
  { id: 3, name: 'Ron Weasley',        email: 'ron@leroy.com',      role: 'Utilisateur',    status: 'Invitation envoyée', statusLabel: 'Invitation envoyée', colorDecoration: 'brown'  },
  { id: 4, name: 'Neville Longbottom', email: 'neville@leroy.com',  role: 'Utilisateur',    status: 'Actif',              statusLabel: 'Actif',              colorDecoration: 'green'  },
  { id: 5, name: 'Luna Lovegood',      email: 'luna@leroy.com',     role: 'Administrateur', status: 'Invitation envoyée', statusLabel: 'Invitation envoyée', colorDecoration: 'pink'   },
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
  { key: 'email', label: 'Email', visible: true },
  {
    key: 'role',
    label: 'Rôle',
    visible: true,
    selectFilter: {
      options: [
        { value: 'Administrateur', label: 'Administrateur' },
        { value: 'Utilisateur', label: 'Utilisateur' },
      ],
    },
    render: (row) => <Text as="span" variant="body-medium-default">{row.role}</Text>,
  },
  {
    key: 'status',
    label: 'Statut',
    visible: true,
    selectFilter: {
      options: [
        { value: 'Actif', label: 'Actif' },
        { value: 'Invitation envoyée', label: 'Invitation envoyée' },
      ],
    },
    render: (row) => (
      <Tag
        label={row.statusLabel}
        status={row.status === 'Actif' ? 'positive' : 'warning'}
        size="compact"
        showDot
      />
    ),
  },
];

export const WithFilters: Story = {
  args: { columns, data: users, rowActions: rowMenuItems },
};

export const Loading: Story = {
  args: { columns, data: [], loading: true, rowActions: rowMenuItems },
};

export const Empty: Story = {
  args: { columns, data: [], emptyMessage: 'Aucun utilisateur trouvé.', rowActions: rowMenuItems },
};
