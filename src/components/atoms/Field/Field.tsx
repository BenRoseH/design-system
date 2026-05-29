import { Field as BaseField } from '@base-ui/react/field';
import { AlertCircle } from 'lucide-react';
import { Text } from '../Text/Text';
import './Field.css';

interface FieldProps {
  label: string;
  helper?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  children: React.ReactNode;
  htmlFor?: string;
}

export function Field({
  label,
  helper,
  required = false,
  error,
  disabled = false,
  children,
  htmlFor,
}: FieldProps) {
  return (
    <BaseField.Root
      className="field"
      disabled={disabled}
      invalid={!!error}
    >
      <div className="field__left">
        <BaseField.Label className="field__label" htmlFor={htmlFor}>
          <Text as="span" variant="body-medium-strong">
            {label}
          </Text>
          {required && (
            <Text as="span" variant="body-medium-strong" color="brand-primary" className="field__required">
              {' *'}
            </Text>
          )}
        </BaseField.Label>

        {helper && !error && (
          <Text
            as="span"
            variant="body-small-default"
            color="muted"
            className="field__helper"
          >
            {helper}
          </Text>
        )}
      </div>

      <div className="field__right">
        {children}

        {error && (
          <div className="field__error">
            <AlertCircle size={12} strokeWidth={2} className="field__error-icon" />
            <Text as="span" variant="body-small-default" className="field__error-text">
              {error}
            </Text>
          </div>
        )}
      </div>
    </BaseField.Root>
  );
}
