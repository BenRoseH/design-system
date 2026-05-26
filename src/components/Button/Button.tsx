import type { Icon as PhosphorIcon } from '@phosphor-icons/react';
import { Button as BaseButton } from '@base-ui/react/button';
import './Button.css';

export type ButtonHierarchy = 'default' | 'strong' | 'negative' | 'brand' | 'minimal';
export type ButtonSize = 'default' | 'compact';
export type ButtonLayout = 'text-only' | 'text-icon' | 'icon-text' | 'icon-only';

type IconProp = React.ComponentType<React.ComponentProps<PhosphorIcon>>;

interface ButtonPropsBase {
  hierarchy?: ButtonHierarchy;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

interface ButtonPropsWithIcon extends ButtonPropsBase {
  layout: 'text-icon' | 'icon-text';
  icon: IconProp;
  'aria-label'?: string;
}

interface ButtonPropsIconOnly extends ButtonPropsBase {
  layout: 'icon-only';
  icon: IconProp;
  'aria-label': string;
}

interface ButtonPropsTextOnly extends ButtonPropsBase {
  layout?: 'text-only';
  icon?: never;
  'aria-label'?: string;
}

type ButtonProps = ButtonPropsTextOnly | ButtonPropsWithIcon | ButtonPropsIconOnly;

export function Button({
  hierarchy = 'default',
  size = 'default',
  layout = 'text-only',
  loading = false,
  disabled = false,
  children,
  onClick,
  type = 'button',
  className,
  ...rest
}: ButtonProps) {
  const icon = 'icon' in rest ? rest.icon : undefined;
  const ariaLabel = 'aria-label' in rest ? rest['aria-label'] : undefined;
  const IconComponent = icon as IconProp | undefined;
  const iconSize = size === 'compact' ? 14 : 16;

  const classes = [
    'btn',
    `btn--${hierarchy}`,
    size === 'compact' ? 'btn--compact' : '',
    `btn--${layout}`,
    loading ? 'btn--loading' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <BaseButton
      className={classes}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      aria-busy={loading}
      aria-label={layout === 'icon-only' ? ariaLabel : undefined}
      onClick={onClick}
      type={type}
    >
      {layout === 'icon-text' && IconComponent && (
        <span className="btn__icon" aria-hidden="true">
          <IconComponent size={iconSize} color="currentColor" />
        </span>
      )}

      {layout !== 'icon-only' && (
        <span className="btn__label">{children}</span>
      )}

      {(layout === 'text-icon' || layout === 'icon-only') && IconComponent && (
        <span className="btn__icon" aria-hidden="true">
          <IconComponent size={iconSize} color="currentColor" />
        </span>
      )}

      {loading && <span className="btn__spinner" aria-hidden="true" />}
    </BaseButton>
  );
}
