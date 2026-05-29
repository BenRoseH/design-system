import type { Meta, StoryObj } from '@storybook/react';
import { User, Mail } from 'lucide-react';
import { Field } from './Field';
import { Input } from '../Input/Input';
import { Select } from '../Select/Select';
import { RadioGroup } from '../Radio/Radio';

const meta = {
  title: 'Atoms/Field',
  component: Field,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

const roleOptions = [
  { value: 'admin', label: 'Administrateur' },
  { value: 'editor', label: 'Éditeur' },
  { value: 'viewer', label: 'Lecteur' },
];

const langOptions = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'English' },
  { value: 'de', label: 'Deutsch' },
];

export const Default: Story = {
  render: () => (
    <Field label="Prénom" htmlFor="input-default">
      <Input id="input-default" icon={User} placeholder="Jean" />
    </Field>
  ),
};

export const WithHelper: Story = {
  render: () => (
    <Field
      label="Nom d'utilisateur"
      helper="Doit contenir entre 3 et 20 caractères."
      htmlFor="input-helper"
    >
      <Input id="input-helper" placeholder="ex. jean_dupont" />
    </Field>
  ),
};

export const Required: Story = {
  render: () => (
    <Field label="Adresse e-mail" required htmlFor="input-required">
      <Input id="input-required" type="email" icon={Mail} placeholder="votre@email.com" />
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field
      label="Adresse e-mail"
      required
      error="Cette adresse email est déjà utilisée."
      htmlFor="input-error"
    >
      <Input id="input-error" type="email" icon={Mail} defaultValue="utilisateur@email.com" />
    </Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field label="Identifiant" disabled htmlFor="input-disabled">
      <Input id="input-disabled" defaultValue="jean_dupont" disabled />
    </Field>
  ),
};

export const WithSelect: Story = {
  render: () => (
    <Field label="Rôle" helper="Définit les permissions de l'utilisateur.">
      <Select options={roleOptions} placeholder="Choisir un rôle..." />
    </Field>
  ),
};

export const WithRadio: Story = {
  render: () => (
    <Field label="Langue" helper="Langue d'affichage de l'interface.">
      <RadioGroup
        defaultValue="fr"
        orientation="horizontal"
        options={langOptions}
      />
    </Field>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-medium)', maxWidth: 640 }}>
      <Field label="Prénom" required htmlFor="form-firstname">
        <Input id="form-firstname" icon={User} placeholder="Jean" />
      </Field>

      <Field label="Nom" required htmlFor="form-lastname">
        <Input id="form-lastname" icon={User} placeholder="Dupont" />
      </Field>

      <Field label="Rôle" helper="Définit les permissions de l'utilisateur.">
        <Select options={roleOptions} placeholder="Choisir un rôle..." />
      </Field>

      <Field label="Langue" helper="Langue d'affichage de l'interface.">
        <RadioGroup
          defaultValue="fr"
          orientation="horizontal"
          options={langOptions}
        />
      </Field>
    </div>
  ),
};
