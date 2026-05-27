import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { Text } from '../Text/Text';
import './Radio.css';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
  options: RadioOption[];
}

export function RadioGroup({
  label,
  value,
  defaultValue,
  onChange,
  disabled = false,
  orientation = 'vertical',
  options,
}: RadioGroupProps) {
  return (
    <div className="radio-group">
      {label && (
        <Text as="span" variant="body-small-strong" className="radio-group__label">
          {label}
        </Text>
      )}
      <BaseRadioGroup
        className={`radio-group__items radio-group__items--${orientation}`}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onChange}
        disabled={disabled}
      >
        {options.map((option) => (
          <label key={option.value} className="radio__item">
            <BaseRadio.Root
              value={option.value}
              disabled={option.disabled}
              className="radio__root"
            >
              <BaseRadio.Indicator keepMounted className="radio__indicator" />
            </BaseRadio.Root>
            <div className="radio__label-wrapper">
              <Text as="span" variant="body-medium-default">
                {option.label}
              </Text>
              {option.description && (
                <Text as="span" variant="body-small-default" color="muted">
                  {option.description}
                </Text>
              )}
            </div>
          </label>
        ))}
      </BaseRadioGroup>
    </div>
  );
}
