import { Fragment } from 'react';
import { Check } from 'lucide-react';
import { Text } from '../../atoms/Text/Text';
import './Stepper.css';

interface StepItem {
  id: number;
  label: string;
  description?: string;
}

interface StepperProps {
  steps: StepItem[];
  currentStep: number;
  completedSteps?: number[];
  orientation?: 'horizontal' | 'vertical';
  onStepClick?: (index: number) => void;
}

type StepState = 'pending' | 'active' | 'completed';

export function Stepper({
  steps,
  currentStep,
  completedSteps = [],
  orientation = 'horizontal',
  onStepClick,
}: StepperProps) {
  function getStepState(index: number): StepState {
    if (completedSteps.includes(index)) return 'completed';
    if (index === currentStep) return 'active';
    return 'pending';
  }

  return (
    <div className={`stepper stepper--${orientation}`}>
      {steps.map((step, index) => {
        const state = getStepState(index);
        const connectorCompleted = completedSteps.includes(index);
        const isClickable = onStepClick !== undefined && state === 'completed';

        const stepClasses = [
          'stepper__step',
          `stepper__step--${state}`,
          isClickable ? 'stepper__step--clickable' : '',
        ]
          .filter(Boolean)
          .join(' ');

        const indicator = (
          <div className="stepper__indicator">
            {state === 'completed' ? (
              <Check size={16} color="var(--color-status-positive-emphasized)" />
            ) : (
              <Text as="span" variant="body-small-strong">
                {index + 1}
              </Text>
            )}
          </div>
        );

        const content = (
          <div className="stepper__content">
            <Text
              as="span"
              variant={state === 'active' ? 'body-medium-strong' : 'body-medium-default'}
              color={state === 'active' ? undefined : 'muted'}
            >
              {step.label}
            </Text>
            {step.description && (state === 'active' || state === 'completed') && (
              <Text as="span" variant="body-small-default" color="muted">
                {step.description}
              </Text>
            )}
          </div>
        );

        return (
          <Fragment key={step.id}>
            {isClickable ? (
              <button
                type="button"
                className={stepClasses}
                onClick={() => onStepClick(index)}
              >
                {indicator}
                {content}
              </button>
            ) : (
              <div className={stepClasses}>
                {indicator}
                {content}
              </div>
            )}

            {index < steps.length - 1 && (
              <div
                className={`stepper__connector stepper__connector--${connectorCompleted ? 'completed' : 'pending'}`}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
