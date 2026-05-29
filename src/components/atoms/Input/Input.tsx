import type { LucideIcon } from 'lucide-react';
import './Input.css';

type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

interface InputProps {
  type?: InputType;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  icon?: LucideIcon;
  id?: string;
  name?: string;
}

export function Input({
  type = 'text',
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled = false,
  invalid = false,
  icon: Icon,
  id,
  name,
}: InputProps) {
  const wrapperClasses = [
    'input__wrapper',
    invalid ? 'input__wrapper--invalid' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {Icon && (
        <span className="input__icon" aria-hidden>
          <Icon size={16} strokeWidth={2} />
        </span>
      )}
      <input
        className="input"
        type={type}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        disabled={disabled}
        id={id}
        name={name}
        aria-invalid={invalid || undefined}
      />
    </div>
  );
}
