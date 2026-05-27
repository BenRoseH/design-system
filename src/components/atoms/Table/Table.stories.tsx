import type { Meta, StoryObj } from '@storybook/react';
import { MoreHorizontal } from 'lucide-react';
import { TableHeaderCell } from './TableHeaderCell';
import { TableCell } from './TableCell';
import { TableRow } from './TableRow';
import { TableHeaderRow } from './TableHeaderRow';
import { Tag } from '../Tag/Tag';
import { Button } from '../Button/Button';
import { Avatar } from '../Avatar/Avatar';
import { Select } from '../Select/Select';
import { MultiSelect } from '../MultiSelect/MultiSelect';
import './Table.css';

const meta = {
  title: 'Atoms/Table',
  parameters: {
    layout: 'padded',
  },
} as Meta;

export default meta;
type Story = StoryObj;

const users = [
  { id: 1, name: 'Harry Potter', email: 'harry@leroy.com', company: 'Leroy Merlin', status: 'positive' as const, statusLabel: 'Actif' },
  { id: 2, name: 'Hermione Granger', email: 'hermione@leroy.com', company: 'Leroy Merlin', status: 'neutral' as const, statusLabel: 'Inactif' },
  { id: 3, name: 'Ron Weasley', email: 'ron@leroy.com', company: 'Leroy Merlin', status: 'warning' as const, statusLabel: 'En attente' },
];

export const Anatomy: Story = {
  render: () => (
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
          {users.map((user) => (
            <TableRow key={user.id} onClick={() => {}}>
              <TableCell>
                  <div className="table-cell__with-avatar">
                    <Avatar fallback={user.name.split(' ').map(n => n[0]).join('')} size="compact" />
                    {user.name}
                  </div>
                </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.company}</TableCell>
              <TableCell>
                <Tag label={user.statusLabel} status={user.status} size="compact" showDot />
              </TableCell>
              <TableCell align="right">
                <Button
                  hierarchy="minimal"
                  layout="icon-only"
                  size="compact"
                  icon={MoreHorizontal}
                  aria-label="Plus d'actions"
                  onClick={(e) => e.stopPropagation()}
                />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
