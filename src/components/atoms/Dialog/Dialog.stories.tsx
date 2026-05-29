import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Trash2, AlertCircle, LogOut } from 'lucide-react';
import { Dialog } from './Dialog';
import { Button } from '../Button/Button';

const meta = {
  title: 'Atoms/Dialog',
  component: Dialog,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ============================================================
   DEFAULT — Suppression destructive
   ============================================================ */

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button hierarchy="negative" layout="icon-text" icon={Trash2} onClick={() => setOpen(true)}>
          Supprimer l'utilisateur
        </Button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          title="Supprimer l'utilisateur"
          description="Vous êtes sur le point de supprimer Harry Potter. Cette action est irréversible et supprimera définitivement toutes les données associées à cet utilisateur."
          confirmLabel="Supprimer"
          cancelLabel="Annuler"
          onConfirm={() => setOpen(false)}
        />
      </>
    );
  },
  args: {
    open: false,
    onOpenChange: () => {},
    title: '',
    description: '',
  },
};

/* ============================================================
   CUSTOM ICON — Déconnexion
   ============================================================ */

export const CustomIcon: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button hierarchy="default" layout="icon-text" icon={LogOut} onClick={() => setOpen(true)}>
          Se déconnecter
        </Button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          title="Se déconnecter"
          description="Vous allez être déconnecté de votre session. Toute progression non sauvegardée sera perdue."
          icon={AlertCircle}
          confirmLabel="Se déconnecter"
          confirmIcon={LogOut}
          cancelLabel="Rester connecté"
          onConfirm={() => setOpen(false)}
        />
      </>
    );
  },
  args: {
    open: false,
    onOpenChange: () => {},
    title: '',
    description: '',
  },
};

/* ============================================================
   LOADING — État de suppression en cours
   ============================================================ */

export const Loading: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleConfirm() {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
      }, 2000);
    }

    return (
      <>
        <Button hierarchy="negative" layout="icon-text" icon={Trash2} onClick={() => setOpen(true)}>
          Supprimer (avec délai)
        </Button>
        <Dialog
          open={open}
          onOpenChange={(o) => { if (!loading) setOpen(o); }}
          title="Supprimer l'utilisateur"
          description="Vous êtes sur le point de supprimer Hermione Granger. Cette action est irréversible."
          confirmLabel="Supprimer"
          cancelLabel="Annuler"
          onConfirm={handleConfirm}
          loading={loading}
        />
      </>
    );
  },
  args: {
    open: false,
    onOpenChange: () => {},
    title: '',
    description: '',
  },
};
