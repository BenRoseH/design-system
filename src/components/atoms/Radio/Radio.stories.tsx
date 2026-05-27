import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioGroup } from './Radio';

const meta = {
  title: 'Atoms/Radio',
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseOptions = [
  { value: 'option-1', label: 'Option 1' },
  { value: 'option-2', label: 'Option 2' },
  { value: 'option-3', label: 'Option 3' },
];

const descriptionOptions = [
  {
    value: 'starter',
    label: 'Starter',
    description: 'Pour les petites équipes jusqu\'à 5 personnes',
  },
  {
    value: 'business',
    label: 'Business',
    description: 'Pour les équipes en croissance jusqu\'à 50 personnes',
  },
  {
    value: 'enterprise',
    label: 'Enterprise',
    description: 'Pour les grandes organisations sans limite',
  },
];

export const Default: Story = {
  args: {
    defaultValue: 'option-1',
    orientation: 'vertical',
    options: baseOptions,
  },
};

export const Horizontal: Story = {
  args: {
    defaultValue: 'option-1',
    orientation: 'horizontal',
    options: baseOptions,
  },
};

export const WithDescription: Story = {
  args: {
    defaultValue: 'starter',
    orientation: 'vertical',
    options: descriptionOptions,
  },
};

export const Controlled: Story = {
  args: {
    options: baseOptions,
  },
  render: () => {
    const [value, setValue] = useState('option-1');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <RadioGroup
          value={value}
          onChange={setValue}
          orientation="vertical"
          options={baseOptions}
        />
        <p style={{ fontSize: 14, color: '#666' }}>Valeur sélectionnée : {value}</p>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 'option-1',
    disabled: true,
    orientation: 'vertical',
    options: baseOptions,
  },
};

export const WithDisabledOption: Story = {
  args: {
    defaultValue: 'option-1',
    orientation: 'vertical',
    options: [
      { value: 'option-1', label: 'Option 1' },
      { value: 'option-2', label: 'Option 2 (désactivée)', disabled: true },
      { value: 'option-3', label: 'Option 3' },
    ],
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Choisissez une option',
    defaultValue: 'option-1',
    orientation: 'vertical',
    options: baseOptions,
  },
};
