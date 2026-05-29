import type { Meta, StoryObj } from '@storybook/react';
import { DynamicForm } from './DynamicForm';
import { usersFields } from '../../../pages/Users/users.fields';

const meta: Meta<typeof DynamicForm> = {
  title: 'Organisms/DynamicForm',
  component: DynamicForm,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof DynamicForm>;

export const CreateUser: Story = {
  args: {
    fields: usersFields,
    onSubmit: (data) => console.log('submit', data),
  },
};

export const Validation: Story = {
  args: {
    fields: usersFields,
    onSubmit: (data) => console.log('submit', data),
  },
  parameters: {
    docs: {
      description: {
        story: 'Soumettez le formulaire sans rien remplir pour voir les erreurs de validation.',
      },
    },
  },
};
