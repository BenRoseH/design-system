import type { Meta, StoryObj } from '@storybook/react';
import { User, Mail, Lock, Search, Phone } from 'lucide-react';
import { Input } from './Input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
  args: {
    type: 'text',
    placeholder: 'Placeholder...',
    disabled: false,
    invalid: false,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
      <Input icon={User} placeholder="Prénom" />
      <Input icon={Mail} type="email" placeholder="Adresse e-mail" />
      <Input icon={Lock} type="password" placeholder="Mot de passe" />
      <Input icon={Phone} type="tel" placeholder="Téléphone" />
      <Input icon={Search} type="search" placeholder="Rechercher..." />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
      <Input placeholder="Enabled" />
      <Input placeholder="Disabled" disabled />
      <Input placeholder="Invalid" invalid defaultValue="valeur incorrecte" />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'jean_dupont' },
};

export const Invalid: Story = {
  args: { invalid: true, defaultValue: 'utilisateur@mail.fr' },
};
