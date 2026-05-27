import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect } from './MultiSelect';

const meta = {
  title: 'Atoms/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const statusOptions = [
  { value: 'active', label: 'Actif' },
  { value: 'inactive', label: 'Inactif' },
  { value: 'pending', label: 'En attente' },
  { value: 'archived', label: 'Archivé' },
];

const roleOptions = [
  { value: 'admin', label: 'Administrateur' },
  { value: 'editor', label: 'Éditeur' },
  { value: 'viewer', label: 'Lecteur' },
  { value: 'guest', label: 'Invité (indisponible)', disabled: true },
];

export const Default: Story = {
  render: () => (
    <MultiSelect label="Statut" options={statusOptions} />
  ),
};

export const WithPreselection: Story = {
  render: () => (
    <MultiSelect label="Statut" options={statusOptions} defaultValue={['active', 'pending']} />
  ),
};

export const Controlled: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>(['active']);
    return (
      <div>
        <MultiSelect
          label="Statut"
          options={statusOptions}
          value={values}
          onChange={setValues}
        />
        <p style={{ marginTop: 12, fontSize: 12, color: '#888' }}>
          Sélectionnés : <strong>{values.join(', ') || '—'}</strong>
        </p>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <MultiSelect label="Default (40px)" options={statusOptions} defaultValue={['active']} size="default" />
      <MultiSelect label="Compact (32px)" options={statusOptions} defaultValue={['active', 'pending']} size="compact" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <MultiSelect label="Statut" options={statusOptions} defaultValue={['active']} disabled />
  ),
};

export const WithDisabledOption: Story = {
  render: () => (
    <MultiSelect label="Rôle" options={roleOptions} defaultValue={['admin']} />
  ),
};

export const FilterExample: Story = {
  render: () => {
    const [statuts, setStatuts] = useState<string[]>([]);
    const [roles, setRoles] = useState<string[]>([]);
    return (
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <MultiSelect label="Statut" options={statusOptions} value={statuts} onChange={setStatuts} size="compact" />
        <MultiSelect label="Rôle" options={roleOptions} value={roles} onChange={setRoles} size="compact" />
      </div>
    );
  },
};
