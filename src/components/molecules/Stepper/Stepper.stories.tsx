import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';
import { DynamicForm } from '../../organisms/DynamicForm/DynamicForm';
import { Button } from '../../atoms/Button/Button';
import { usersFields } from '../../../pages/Users/users.fields';

const meta = {
  title: 'Molecules/Stepper',
  component: Stepper,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSteps = [
  { id: 1, label: 'Informations' },
  { id: 2, label: 'Contact' },
  { id: 3, label: 'Confirmation' },
];

export const Step1: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 0,
    completedSteps: [],
  },
};

export const Step2: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
    completedSteps: [0],
  },
};

export const Step3: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 2,
    completedSteps: [0, 1],
  },
};

export const Completed: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 3,
    completedSteps: [0, 1, 2],
  },
};

export const Vertical: Story = {
  args: {
    steps: defaultSteps,
    currentStep: 1,
    completedSteps: [0],
    orientation: 'vertical',
  },
};

export const WithDescription: Story = {
  args: {
    steps: [
      { id: 1, label: 'Informations', description: 'Prénom, nom et société' },
      { id: 2, label: 'Contact', description: 'Email et numéro de téléphone' },
      { id: 3, label: 'Confirmation', description: 'Vérification des données' },
    ],
    currentStep: 1,
    completedSteps: [0],
  },
};

const stepFields = [
  usersFields.slice(0, 2),
  usersFields.slice(2, 4),
  usersFields.slice(4),
];

const formSteps = [
  { id: 1, label: 'Identité' },
  { id: 2, label: 'Contact' },
  { id: 3, label: 'Rôle' },
];

function FormExampleWrapper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  function handleNext() {
    setCompletedSteps((prev) => [...new Set([...prev, currentStep])]);
    setCurrentStep((prev) => prev + 1);
  }

  function handlePrev() {
    setCurrentStep((prev) => prev - 1);
  }

  function handleStepClick(index: number) {
    setCurrentStep(index);
    setCompletedSteps((prev) => prev.filter((s) => s < index));
  }

  const isLastStep = currentStep === formSteps.length - 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 480 }}>
      <Stepper
        steps={formSteps}
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={handleStepClick}
      />
      <DynamicForm
        key={currentStep}
        fields={stepFields[currentStep]}
        onSubmit={() => {}}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          hierarchy="minimal"
          onClick={handlePrev}
          disabled={currentStep === 0}
        >
          Précédent
        </Button>
        {isLastStep ? (
          <Button hierarchy="brand" onClick={() => {}}>
            Terminer
          </Button>
        ) : (
          <Button onClick={handleNext}>
            Suivant
          </Button>
        )}
      </div>
    </div>
  );
}

export const FormExample: Story = {
  render: () => <FormExampleWrapper />,
};
