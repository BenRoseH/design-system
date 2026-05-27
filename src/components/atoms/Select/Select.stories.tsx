import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta = {
  title: 'Atoms/Select',
  component: Select,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const fruitOptions = [
  { value: 'pomme', label: 'Pomme' },
  { value: 'banane', label: 'Banane' },
  { value: 'cerise', label: 'Cerise' },
  { value: 'mangue', label: 'Mangue' },
  { value: 'fraise', label: 'Fraise' },
];

const roleOptions = [
  { value: 'all', label: 'Tous' },
  { value: 'admin', label: 'Administrateur' },
  { value: 'user', label: 'Utilisateur' },
];

export const Default: Story = {
  render: () => (
    <Select options={fruitOptions} placeholder="Choisir..." />
  ),
};

export const WithLabel: Story = {
  render: () => (
    <Select label="Fruit préféré" options={fruitOptions} placeholder="Choisir..." />
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('banane');
    return (
      <div>
        <Select
          label="Fruit (contrôlé)"
          options={fruitOptions}
          value={value}
          onChange={setValue}
        />
        <p style={{ marginTop: 12, fontSize: 12, color: '#888' }}>
          Valeur sélectionnée : <strong>{value}</strong>
        </p>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <Select label="Default (40px)" options={fruitOptions} placeholder="Choisir..." size="default" />
      <Select label="Compact (32px)" options={fruitOptions} placeholder="Choisir..." size="compact" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select label="Désactivé" options={fruitOptions} placeholder="Choisir..." disabled />
  ),
};

export const WithDisabledOption: Story = {
  render: () => (
    <Select
      label="Fruit"
      options={[
        { value: 'pomme', label: 'Pomme' },
        { value: 'banane', label: 'Banane' },
        { value: 'durian', label: 'Durian (indisponible)', disabled: true },
        { value: 'mangue', label: 'Mangue' },
        { value: 'fraise', label: 'Fraise' },
      ]}
      placeholder="Choisir..."
    />
  ),
};

export const FilterExample: Story = {
  render: () => {
    const [role, setRole] = useState('all');
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 14 }}>Filtrer par rôle :</span>
        <Select
          options={roleOptions}
          value={role}
          onChange={setRole}
          size="compact"
        />
      </div>
    );
  },
};
