import type { Meta, StoryObj } from '@storybook/react';
import { UserCard } from './UserCard';

const meta = {
  title: 'Molecules/UserCard',
  component: UserCard,
  args: {
    firstName: 'Prénom',
    lastName: 'Nom',
    company: 'Entreprise',
  },
} satisfies Meta<typeof UserCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    company: 'Entreprise',
    onClick: () => {},
  },
};

export const Focus: Story = {
  args: {
    onClick: () => {},
  },
  parameters: { pseudo: { focusVisible: true } },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 280 }}>
      <UserCard
        firstName="Prénom"
        lastName="Nom"
        company="Entreprise"
        onClick={() => {}}
      />
      <UserCard
        firstName="Prénom"
        lastName="Nom"
        company="Entreprise"
        selected
        onClick={() => {}}
      />
      <UserCard
        firstName="Prénom"
        lastName="Nom"
        company="Entreprise"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 280 }}>
      <UserCard firstName="Prénom" lastName="Nom" company="Entreprise" size="sm" />
      <UserCard firstName="Prénom" lastName="Nom" company="Entreprise" size="md" />
      <UserCard firstName="Prénom" lastName="Nom" company="Entreprise" size="lg" />
    </div>
  ),
};
