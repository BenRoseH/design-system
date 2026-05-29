import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { User, Users, BarChart2, Settings, Zap, Bot, ScrollText, Network, Library, Check } from 'lucide-react';
import { FormPage } from './FormPage';
import { DynamicForm } from '../../components/organisms/DynamicForm/DynamicForm';
import { GlobalLayout } from '../../components/organisms/GlobalLayout/GlobalLayout';
import { Button } from '../../components/atoms/Button/Button';
import { usersFields } from '../../pages/Users/users.fields';

const meta = {
  title: 'Pages/Form Page',
  component: FormPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FormPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const navSections = [
  {
    label: 'Organisation',
    items: [
      { label: 'Utilisateurs', icon: User, selected: true, onClick: () => {} },
      { label: 'Groupes', icon: Users, onClick: () => {} },
      { label: 'Usages', icon: BarChart2, onClick: () => {} },
    ],
  },
  {
    label: 'Configuration',
    items: [
      { label: 'Paramètres', icon: Settings, onClick: () => {} },
      { label: 'Connecteurs', icon: Zap, onClick: () => {} },
      { label: "Packs d'agents", icon: Bot, onClick: () => {} },
      { label: 'CGU', icon: ScrollText, onClick: () => {} },
    ],
  },
  {
    label: 'Espace souverain',
    items: [
      { label: 'Espaces de travail', icon: Network, onClick: () => {} },
      { label: 'Bases documentaires', icon: Library, onClick: () => {} },
      { label: 'Paramètres', icon: Settings, onClick: () => {} },
    ],
  },
];

const navUser = { firstName: 'Harry', lastName: 'Potter', company: 'Leroy Merlin' };

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [formValid, setFormValid] = useState(false);
    return (
      <GlobalLayout sections={navSections} user={navUser}>
        <Button hierarchy="brand" onClick={() => setOpen(true)}>
          Nouvel utilisateur
        </Button>
        <FormPage
          title="Nouvel utilisateur"
          isOpen={open}
          onClose={() => setOpen(false)}
          onBack={() => setOpen(false)}
          backLabel="Annuler"
          formId="form-page-default"
          nextLabel="Créer"
          nextIcon={Check}
          nextIconSide="left"
          nextDisabled={!formValid}
        >
          <DynamicForm
            id="form-page-default"
            title="Information"
            fields={usersFields}
            onSubmit={(data) => { console.log('submit', data); setOpen(false); }}
            onValidityChange={setFormValid}
          />
        </FormPage>
      </GlobalLayout>
    );
  },
};

export const WithoutBack: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [formValid, setFormValid] = useState(false);
    return (
      <GlobalLayout sections={navSections} user={navUser}>
        <Button hierarchy="brand" onClick={() => setOpen(true)}>
          Ouvrir le formulaire
        </Button>
        <FormPage
          title="Nouvel utilisateur"
          isOpen={open}
          onClose={() => setOpen(false)}
          formId="form-page-without-back"
          nextLabel="Créer"
          nextIcon={Check}
          nextIconSide="left"
          nextDisabled={!formValid}
        >
          <DynamicForm
            id="form-page-without-back"
            title="Information"
            fields={usersFields}
            onSubmit={(data) => { console.log('submit', data); setOpen(false); }}
            onValidityChange={setFormValid}
          />
        </FormPage>
      </GlobalLayout>
    );
  },
};
