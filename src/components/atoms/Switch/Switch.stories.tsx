import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './Switch';
import { Field } from '../Field/Field';

const meta = {
  title: 'Atoms/Switch',
  component: Switch,
  args: {
    disabled: false,
    size: 'md',
    labelPosition: 'right',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
    },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Activer les notifications',
  },
};

export const LabelLeft: Story = {
  args: {
    label: 'Activer les notifications',
    labelPosition: 'left',
  },
};

export const WithHelper: Story = {
  args: {
    label: 'Activer les notifications',
    helper: 'Vous recevrez des alertes en temps réel.',
  },
};

export const Checked: Story = {
  args: {
    label: 'Activer les notifications',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Activer les notifications',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Activer les notifications',
    disabled: true,
    defaultChecked: true,
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <Switch {...args} size="sm" label="Small" />
      <Switch {...args} size="md" label="Medium" />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Switch
          label="Mode sombre"
          checked={checked}
          onChange={setChecked}
        />
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
          État : <strong>{checked ? 'activé' : 'désactivé'}</strong>
        </p>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => (
    <div style={{ width: '360px' }}>
      <Field label="Notifications">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Switch label="Notifications email" defaultChecked />
          <Switch label="Notifications push" />
          <Switch
            label="Newsletter"
            helper="Recevez nos actualités chaque semaine."
          />
        </div>
      </Field>
    </div>
  ),
};
