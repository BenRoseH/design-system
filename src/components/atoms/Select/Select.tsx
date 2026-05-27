import { Select as BaseSelect } from '@base-ui/react/select';
import { ChevronDown, Check } from 'lucide-react';
import { Text } from '../Text/Text';
import './Select.css';

export type SelectSize = 'default' | 'compact';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  size?: SelectSize;
}

export function Select({
  label,
  placeholder = 'Choisir...',
  options,
  value,
  defaultValue,
  onChange,
  disabled = false,
  size = 'default',
}: SelectProps) {
  const iconSize = size === 'compact' ? 14 : 16;
  const triggerClasses = [
    'select__trigger',
    size === 'compact' ? 'select__trigger--compact' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className="select">
      <BaseSelect.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onChange}
        disabled={disabled}
      >
        {label && (
          <Text as="label" variant="body-small-strong" className="select__label">
            {label}
          </Text>
        )}

        <BaseSelect.Trigger className={triggerClasses}>
          <BaseSelect.Value placeholder={placeholder} />
          <BaseSelect.Icon className="select__icon">
            <ChevronDown size={iconSize} strokeWidth={2} />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>

        <BaseSelect.Portal>
          <BaseSelect.Positioner alignItemWithTrigger={false} align="start" sideOffset={4}>
            <BaseSelect.Popup className="select__popup">
              <BaseSelect.List className="select__list">
                {options.map((option) => (
                  <BaseSelect.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className="select__item"
                  >
                    <BaseSelect.ItemText>
                      <Text as="span" variant="body-medium-default">{option.label}</Text>
                    </BaseSelect.ItemText>
                    <BaseSelect.ItemIndicator className="select__item-indicator">
                      <Check size={14} strokeWidth={2} />
                    </BaseSelect.ItemIndicator>
                  </BaseSelect.Item>
                ))}
              </BaseSelect.List>
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
    </div>
  );
}
