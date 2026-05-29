import { useState, useEffect } from 'react';
import type { FieldConfig } from '../../../types/field';
import { Field } from '../../atoms/Field/Field';
import { Input } from '../../atoms/Input/Input';
import { Select } from '../../atoms/Select/Select';
import './DynamicForm.css';

interface DynamicFormProps {
  id?: string;
  title?: string;
  fields: FieldConfig[];
  onSubmit: (data: Record<string, any>) => void;
  onValidityChange?: (isValid: boolean) => void;
}

function validateFields(
  fields: FieldConfig[],
  values: Record<string, string>
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const field of fields) {
    const value = values[field.name] ?? '';

    if (field.required && !value.trim()) {
      errors[field.name] = `${field.label} est requis`;
      continue;
    }

    if (!value.trim()) continue;

    if (field.validation?.minLength && value.length < field.validation.minLength.value) {
      errors[field.name] = field.validation.minLength.message;
      continue;
    }

    if (field.validation?.maxLength && value.length > field.validation.maxLength.value) {
      errors[field.name] = field.validation.maxLength.message;
      continue;
    }

    if (field.validation?.pattern && !field.validation.pattern.value.test(value)) {
      errors[field.name] = field.validation.pattern.message;
      continue;
    }

    if (field.validation?.custom) {
      const msg = field.validation.custom(value);
      if (msg) errors[field.name] = msg;
    }
  }

  return errors;
}

export function DynamicForm({
  id,
  title,
  fields,
  onSubmit,
  onValidityChange,
}: DynamicFormProps) {
  const [values, setValues] = useState<Record<string, string>>(
    () => Object.fromEntries(fields.map((f) => [f.name, '']))
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!onValidityChange) return;
    const isValid = fields
      .filter((f) => f.required)
      .every((f) => values[f.name]?.trim());
    onValidityChange(isValid);
  }, [values, fields, onValidityChange]);

  function setValue(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validateFields(fields, values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(values);
  }

  return (
    <div className="dynamic-form">
      {title && <p className="dynamic-form__title">{title}</p>}
      <form id={id} className="dynamic-form__panel" onSubmit={handleSubmit} noValidate>
      <div className="dynamic-form__fields">
        {fields.map((field) => (
          <Field
            key={field.name}
            label={field.label}
            helper={field.helper}
            required={field.required}
            error={errors[field.name]}
            htmlFor={field.type !== 'select' ? field.name : undefined}
          >
            {(field.type === 'text' || field.type === 'email') && (
              <Input
                id={field.name}
                name={field.name}
                type={field.type}
                value={values[field.name]}
                onChange={(v) => setValue(field.name, v)}
                placeholder={field.placeholder}
                invalid={!!errors[field.name]}
              />
            )}

            {field.type === 'select' && (
              <Select
                options={field.options ?? []}
                value={values[field.name]}
                onChange={(v) => setValue(field.name, v)}
              />
            )}
          </Field>
        ))}
      </div>
    </form>
    </div>
  );
}
