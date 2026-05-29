import type { LucideIcon } from 'lucide-react';
import { Button as BaseButton } from '@base-ui/react/button';
import './Button.css';

export type ButtonHierarchy = 'default' | 'strong' | 'negative' | 'brand' | 'minimal';
export type ButtonSize = 'default' | 'compact';
export type ButtonLayout = 'text' | 'text-icon' | 'icon-text' | 'icon-only';

type IconProp = LucideIcon;

interface ButtonPropsBase {
  hierarchy?: ButtonHierarchy;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  form?: string;
  className?: string;
}

interface ButtonPropsText extends ButtonPropsBase {
  layout?: 'text';
  icon?: never;
  'aria-label'?: string;
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

type ButtonProps = ButtonPropsText | ButtonPropsWithIcon | ButtonPropsIconOnly;

export function Button({
  hierarchy = 'default',
  size = 'default',
  layout = 'text',
  loading = false,
  disabled = false,
  children,
  onClick,
  type = 'button',
  form,
  className,
  ...rest
}: ButtonProps) {
  const IconComponent = ('icon' in rest ? rest.icon : undefined) as IconProp | undefined;
  const ariaLabel = 'aria-label' in rest ? rest['aria-label'] : undefined;
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
      disabled={disabled}
      aria-disabled={disabled}
      aria-busy={loading}
      aria-label={layout === 'icon-only' ? ariaLabel : undefined}
      onClick={onClick}
      type={type}
      form={form}
    >
      {layout === 'icon-text' && IconComponent && (
        <span className="btn__icon" aria-hidden="true">
          <IconComponent size={iconSize} color="currentColor" strokeWidth={2} />
        </span>
      )}

      {layout !== 'icon-only' && (
        <span className="btn__label">{children}</span>
      )}

      {(layout === 'text-icon' || layout === 'icon-only') && IconComponent && (
        <span className="btn__icon" aria-hidden="true">
          <IconComponent size={iconSize} color="currentColor" strokeWidth={2} />
        </span>
      )}

      {loading && <span className="btn__spinner" aria-hidden="true" />}
    </BaseButton>
  );
}
