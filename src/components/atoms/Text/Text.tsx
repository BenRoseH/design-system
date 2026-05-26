import './Text.css';

type TextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label';

export type TextVariant =
  | 'display-large' | 'display-medium' | 'display-small'
  | 'heading-xlarge' | 'heading-large' | 'heading-medium' | 'heading-small'
  | 'body-large-default' | 'body-large-moderate' | 'body-large-strong'
  | 'body-medium-default' | 'body-medium-moderate' | 'body-medium-strong'
  | 'body-small-default' | 'body-small-moderate' | 'body-small-strong'
  | 'code-default';

export type TextColor = 'muted' | 'disable' | 'brand-primary';

interface TextProps {
  as?: TextTag;
  variant?: TextVariant;
  color?: TextColor;
  children?: React.ReactNode;
  className?: string;
  htmlFor?: string;
  id?: string;
}

export function Text({
  as: Tag = 'p',
  variant = 'body-medium-default',
  color,
  children,
  className,
  htmlFor,
  id,
}: TextProps) {
  const classes = [
    'text',
    `text--${variant}`,
    color ? `text--${color}` : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      className={classes}
      htmlFor={Tag === 'label' ? htmlFor : undefined}
      id={id}
    >
      {children}
    </Tag>
  );
}
