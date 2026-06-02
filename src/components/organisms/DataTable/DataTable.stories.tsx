import type { Meta, StoryObj } from '@storybook/react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { DataTable } from './DataTable';
import { usersColumns } from '../../../pages/Users/users.columns';
import type { User } from '../../../types/user';
import type { ContextMenuItem } from '../../atoms/ContextMenu/ContextMenu';

const meta = {
  title: 'Organisms/DataTable',
  component: DataTable,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockUsers: User[] = [
  {
    id: '1',
    created_at: '2024-01-15T10:00:00Z',
    first_name: 'Harry',
    last_name: 'Potter',
    email: 'harry.potter@leroy.com',
    color_decoration: 'blue',
    language: 'Français',
    statut: 'Actif',
    last_activity: 'Il y a 2h',
    united_used: 42,
    united_total: 100,
    role: 'Administrateur',
  },
  {
    id: '2',
    created_at: '2024-02-10T09:00:00Z',
    first_name: 'Hermione',
    last_name: 'Granger',
    email: 'hermione.granger@leroy.com',
    color_decoration: 'purple',
    language: 'Anglais',
    statut: 'Actif',
    last_activity: 'Il y a 1j',
    united_used: 87,
    united_total: 100,
    role: 'Utilisateur',
  },
  {
    id: '3',
    created_at: '2024-03-05T14:00:00Z',
    first_name: 'Ron',
    last_name: 'Weasley',
    email: 'ron.weasley@leroy.com',
    color_decoration: 'brown',
    language: 'Français',
    statut: 'Invitation envoyée',
    last_activity: '',
    united_used: 0,
    united_total: 100,
    role: 'Utilisateur',
  },
  {
    id: '4',
    created_at: '2024-04-20T11:00:00Z',
    first_name: 'Albus',
    last_name: 'Dumbledore',
    email: 'albus.dumbledore@leroy.com',
    color_decoration: 'yellow',
    language: 'Français',
    statut: 'Actif',
    last_activity: 'Il y a 3j',
    united_used: 12,
    united_total: 100,
    role: 'Administrateur',
  },
  {
    id: '5',
    created_at: '2024-05-01T08:00:00Z',
    first_name: 'Minerva',
    last_name: 'McGonagall',
    email: 'minerva.mcgonagall@leroy.com',
    color_decoration: 'green',
    language: 'Anglais',
    statut: 'Invitation envoyée',
    last_activity: '',
    united_used: 0,
    united_total: 100,
    role: 'Utilisateur',
  },
];

const rowMenuItems: ContextMenuItem[] = [
  { type: 'item', label: 'Voir', icon: Eye },
  { type: 'item', label: 'Modifier', icon: Pencil },
  { type: 'separator' },
  { type: 'item', label: 'Supprimer', icon: Trash2, destructive: true },
];

export const Default: Story = {
  args: {
    columns: usersColumns,
    data: mockUsers,
    rowActions: rowMenuItems,
  },
};

export const Loading: Story = {
  args: {
    columns: usersColumns,
    data: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns: usersColumns,
    data: [],
    emptyMessage: 'Aucun utilisateur trouvé.',
  },
};

export const WithError: Story = {
  args: {
    columns: usersColumns,
    data: [],
    error: 'Une erreur est survenue lors du chargement des utilisateurs.',
  },
};
