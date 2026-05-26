import type { LucideIcon } from 'lucide-react';
import { Text } from '../Text/Text';
import './NavItem.css';

interface NavItemPropsBase {
  icon?: LucideIcon;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

interface NavItemPropsWithLabel extends NavItemPropsBase {
  label: string;
  'aria-label'?: string;
}

interface NavItemPropsIconOnly extends NavItemPropsBase {
  label?: never;
  'aria-label': string;
}

type NavItemProps = NavItemPropsWithLabel | NavItemPropsIconOnly;

export function NavItem({
  label,
  icon: Icon,
  selected = false,
  disabled = false,
  onClick,
  ...rest
}: NavItemProps) {
  const iconOnly = Icon !== undefined && label === undefined;
  const ariaLabel = 'aria-label' in rest ? rest['aria-label'] : undefined;

  const classes = [
    'nav-item',
    iconOnly ? 'nav-item--icon-only' : '',
    selected ? 'nav-item--selected' : '',
    disabled ? 'nav-item--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      disabled={disabled}
      aria-current={selected ? 'page' : undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      type="button"
    >
      {Icon && (
        <span className="nav-item__icon" aria-hidden="true">
          <Icon size={20} strokeWidth={2} color="currentColor" />
        </span>
      )}
      {label && (
        <Text as="span" variant="body-medium-moderate">
          {label}
        </Text>
      )}
    </button>
  );
}
