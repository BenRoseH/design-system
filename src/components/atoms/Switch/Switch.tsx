import { useId } from 'react';
import { Switch as BaseSwitch } from '@base-ui/react/switch';
import { Text } from '../Text/Text';
import './Switch.css';

type SwitchSize = 'sm' | 'md';
type LabelPosition = 'left' | 'right';

interface SwitchProps {
  label?: string;
  helper?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: SwitchSize;
  labelPosition?: LabelPosition;
}

export function Switch({
  label,
  helper,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  size = 'md',
  labelPosition = 'right',
}: SwitchProps) {
  const labelId = useId();

  const wrapperClasses = [
    'switch-wrapper',
    `switch-wrapper--${size}`,
    disabled ? 'switch-wrapper--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const labelGroup = label && (
    <div className="switch__label-group">
      <Text as="span" variant="body-medium-default" id={labelId}>
        {label}
      </Text>
      {helper && (
        <Text as="span" variant="body-small-default" color="muted">
          {helper}
        </Text>
      )}
    </div>
  );

  return (
    <div className={wrapperClasses}>
      {label && labelPosition === 'left' && labelGroup}
      <BaseSwitch.Root
        className="switch__track"
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onChange}
        disabled={disabled}
        aria-labelledby={label ? labelId : undefined}
      >
        <BaseSwitch.Thumb className="switch__thumb" />
      </BaseSwitch.Root>
      {label && labelPosition === 'right' && labelGroup}
    </div>
  );
}
