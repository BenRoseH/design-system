import { useState } from 'react';
import { Popover } from '@base-ui/react/popover';
import { ChevronDown, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Text } from '../Text/Text';
import './MultiSelect.css';

export type MultiSelectSize = 'default' | 'compact';

export interface MultiSelectOption {
  value: string;
  label: string;
  icon?: LucideIcon;
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
  icon?: LucideIcon;
}

export function MultiSelect({
  label,
  options,
  value,
  defaultValue = [],
  onChange,
  disabled = false,
  size = 'default',
  icon: Icon,
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
          {Icon && (
            <span className="multiselect__prefix-icon" aria-hidden>
              <Icon size={iconSize} strokeWidth={2} />
            </span>
          )}
          <Text as="span" variant="body-medium-default">{label}</Text>
          <span className={`multiselect__count${count === 0 ? ' multiselect__count--hidden' : ''}`} aria-hidden={count === 0}>
            <Text as="span" variant="body-small-strong">{count}</Text>
          </span>
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
                  const OptionIcon = option.icon;
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
                      {OptionIcon && (
                        <span className="multiselect__item-icon" aria-hidden>
                          <OptionIcon size={14} strokeWidth={2} />
                        </span>
                      )}
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
