import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { Button } from '../Button/Button';
import { ToastProvider, useToast } from './ToastProvider';
import type { ToastData } from './Toast';

const meta = {
  title: 'Atoms/Toast',
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/* ----------------------------------------------------------
   Helpers
---------------------------------------------------------- */

function FireToast({ data }: { data: ToastData }) {
  const { toast } = useToast();
  useEffect(() => {
    toast(data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={{ padding: 'var(--spacing-large)', height: '120px' }} />
  );
}

/* ----------------------------------------------------------
   Stories
---------------------------------------------------------- */

function PlaygroundRender() {
  const { toast } = useToast();
  return (
    <div
      style={{
        padding: 'var(--spacing-large)',
        display: 'flex',
        gap: 'var(--spacing-xsmall)',
        flexWrap: 'wrap',
      }}
    >
      <Button
        hierarchy="default"
        onClick={() => toast({ title: 'Opération réussie', variant: 'positive' })}
      >
        Positive
      </Button>
      <Button
        hierarchy="negative"
        onClick={() => toast({ title: 'Une erreur est survenue', variant: 'negative' })}
      >
        Negative
      </Button>
      <Button
        hierarchy="default"
        onClick={() => toast({ title: 'Attention requise', variant: 'warning' })}
      >
        Warning
      </Button>
      <Button
        hierarchy="default"
        onClick={() => toast({ title: 'Information', variant: 'info' })}
      >
        Info
      </Button>
      <Button
        hierarchy="default"
        onClick={() => toast({ title: 'Notification', variant: 'neutral' })}
      >
        Neutral
      </Button>
    </div>
  );
}

export const Playground: Story = {
  render: () => <PlaygroundRender />,
};

export const Positive: Story = {
  render: () => (
    <FireToast
      data={{ title: 'Opération réussie', variant: 'positive', duration: 0 }}
    />
  ),
};

export const Negative: Story = {
  render: () => (
    <FireToast
      data={{ title: 'Une erreur est survenue', variant: 'negative', duration: 0 }}
    />
  ),
};

export const Warning: Story = {
  render: () => (
    <FireToast
      data={{ title: 'Attention requise', variant: 'warning', duration: 0 }}
    />
  ),
};

export const Info: Story = {
  render: () => (
    <FireToast
      data={{ title: 'Information importante', variant: 'info', duration: 0 }}
    />
  ),
};

export const Neutral: Story = {
  render: () => (
    <FireToast
      data={{ title: 'Nouvelle notification', variant: 'neutral', duration: 0 }}
    />
  ),
};

export const WithDescription: Story = {
  render: () => (
    <FireToast
      data={{
        title: 'Utilisateur créé',
        description: 'Marie Dupont a été ajoutée avec succès.',
        variant: 'positive',
        duration: 0,
      }}
    />
  ),
};

function WithActionRender() {
  const { toast } = useToast();
  useEffect(() => {
    toast({
      title: 'Fichier supprimé',
      description: 'rapport-2024.pdf a été supprimé.',
      variant: 'neutral',
      duration: 0,
      action: {
        label: 'Annuler',
        onClick: () => console.log('Action Annuler cliquée'),
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div style={{ padding: 'var(--spacing-large)', height: '150px' }} />;
}

export const WithAction: Story = {
  render: () => <WithActionRender />,
};

export const WithProgress: Story = {
  render: () => (
    <FireToast
      data={{
        title: 'Sauvegarde en cours',
        description: 'Vos modifications seront sauvegardées dans quelques secondes.',
        variant: 'info',
        duration: 4000,
      }}
    />
  ),
};

function StackedRender() {
  const { toast } = useToast();

  const triggerAll = () => {
    toast({ title: 'Premier toast', variant: 'info', duration: 0 });
    setTimeout(() => toast({ title: 'Deuxième toast', variant: 'positive', duration: 0 }), 150);
    setTimeout(() => toast({ title: 'Troisième toast', variant: 'warning', duration: 0 }), 300);
  };

  return (
    <div style={{ padding: 'var(--spacing-large)' }}>
      <Button hierarchy="default" onClick={triggerAll}>
        Déclencher 3 toasts
      </Button>
    </div>
  );
}

export const Stacked: Story = {
  render: () => <StackedRender />,
};

export const Persistent: Story = {
  render: () => (
    <FireToast
      data={{
        title: 'Action requise',
        description: 'Veuillez confirmer votre adresse e-mail pour continuer.',
        variant: 'warning',
        duration: 0,
      }}
    />
  ),
};
