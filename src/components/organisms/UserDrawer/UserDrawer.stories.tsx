import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { User } from 'lucide-react';
import { UserDrawer } from './UserDrawer';
import { Button } from '../../atoms/Button/Button';
import type { User as UserType } from '../../../types/user';

const meta = {
  title: 'Organisms/UserDrawer',
  component: UserDrawer,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof UserDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseUser: UserType = {
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
};

/* ============================================================
   ACTIF
   ============================================================ */

export const Actif: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button hierarchy="default" layout="icon-text" icon={User} onClick={() => setOpen(true)}>
          Voir Harry Potter
        </Button>
        <UserDrawer user={open ? baseUser : null} onClose={() => setOpen(false)} />
      </>
    );
  },
  args: { user: null, onClose: () => {} },
};

/* ============================================================
   INVITATION ENVOYÉE
   ============================================================ */

export const InvitationEnvoyee: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const user: UserType = {
      ...baseUser,
      id: '2',
      first_name: 'Ron',
      last_name: 'Weasley',
      email: 'ron.weasley@leroy.com',
      color_decoration: 'brown',
      statut: 'Invitation envoyée',
      last_activity: '',
      united_used: 0,
      role: 'Utilisateur',
    };
    return (
      <>
        <Button hierarchy="default" layout="icon-text" icon={User} onClick={() => setOpen(true)}>
          Voir Ron Weasley
        </Button>
        <UserDrawer user={open ? user : null} onClose={() => setOpen(false)} />
      </>
    );
  },
  args: { user: null, onClose: () => {} },
};

/* ============================================================
   FORTE CONSOMMATION
   ============================================================ */

export const HauteConsommation: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const user: UserType = {
      ...baseUser,
      id: '3',
      first_name: 'Hermione',
      last_name: 'Granger',
      email: 'hermione.granger@leroy.com',
      color_decoration: 'purple',
      language: 'Anglais',
      united_used: 94,
      united_total: 100,
      role: 'Utilisateur',
      last_activity: 'Il y a 1j',
    };
    return (
      <>
        <Button hierarchy="default" layout="icon-text" icon={User} onClick={() => setOpen(true)}>
          Voir Hermione Granger
        </Button>
        <UserDrawer user={open ? user : null} onClose={() => setOpen(false)} />
      </>
    );
  },
  args: { user: null, onClose: () => {} },
};
