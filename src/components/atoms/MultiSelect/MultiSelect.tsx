import { useState } from 'react';
import { Popover } from '@base-ui/react/popover';
import { ChevronDown, Check } from 'lucide-react';
import { Text } from '../Text/Text';
import './MultiSelect.css';

export type MultiSelectSize = 'default' | 'compact';

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface MultiSelectProps {
  label: string;
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  disabled?: boolean;
  size?: MultiSelectSize;
}

export function MultiSelect({
  label,
  options,
  value,
  defaultValue = [],
  onChange,
  disabled = false,
  size = 'default',
}: MultiSelectProps) {
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const selectedValues = value ?? internalValue;

  const toggle = (optionValue: string) => {
    const next = selectedValues.includes(optionValue)
      ? selectedValues.filter(v => v !== optionValue)
      : [...selectedValues, optionValue];
    setInternalValue(next);
    onChange?.(next);
  };

  const longestLabel = [label, ...options.map(o => o.label)]
    .reduce((a, b) => a.length >= b.length ? a : b, '');

  const count = selectedValues.length;
  const iconSize = size === 'compact' ? 14 : 16;
  const triggerClass = [
    'multiselect__trigger',
    size === 'compact' ? 'multiselect__trigger--compact' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className="multiselect">
      <Popover.Root>
        <Popover.Trigger className={triggerClass} disabled={disabled}>
          <span className="multiselect__value-sizer">
            <Text as="span" variant="body-medium-default">{label}</Text>
            <Text as="span" variant="body-medium-default" className="multiselect__sizer-ghost" aria-hidden="true">
              {longestLabel}
            </Text>
          </span>
          {count > 0 && (
            <span className="multiselect__count">
              <Text as="span" variant="body-small-strong">{count}</Text>
            </span>
          )}
          <span className="multiselect__icon">
            <ChevronDown size={iconSize} strokeWidth={2} />
          </span>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Positioner sideOffset={4} align="start">
            <Popover.Popup className="multiselect__popup">
              <ul
                className="multiselect__list"
                role="listbox"
                aria-multiselectable="true"
                aria-label={label}
              >
                {options.map(option => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <li
                      key={option.value}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={option.disabled}
                      tabIndex={option.disabled ? -1 : 0}
                      className={[
                        'multiselect__item',
                        isSelected ? 'multiselect__item--selected' : '',
                        option.disabled ? 'multiselect__item--disabled' : '',
                      ].filter(Boolean).join(' ')}
                      onClick={() => !option.disabled && toggle(option.value)}
                      onKeyDown={(e) => {
                        if ((e.key === ' ' || e.key === 'Enter') && !option.disabled) {
                          e.preventDefault();
                          toggle(option.value);
                        }
                      }}
                    >
                      <span className={[
                        'multiselect__checkbox',
                        isSelected ? 'multiselect__checkbox--checked' : '',
                      ].filter(Boolean).join(' ')}>
                        {isSelected && <Check size={10} strokeWidth={2.5} />}
                      </span>
                      <Text as="span" variant="body-medium-default">{option.label}</Text>
                    </li>
                  );
                })}
              </ul>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
