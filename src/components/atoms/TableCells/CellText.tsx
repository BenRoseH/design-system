import { Text } from '../Text/Text';
import './TableCells.css';

interface CellTextProps {
  value: string | number;
  variant?: 'default' | 'muted' | 'strong';
  truncate?: boolean;
}

export function CellText({ value, variant = 'default', truncate = true }: CellTextProps) {
  const textVariant = variant === 'strong' ? 'body-small-strong' : 'body-small-default';
  const color = variant === 'muted' ? 'muted' : undefined;

  return (
    <Text
      as="span"
      variant={textVariant}
      color={color}
      className={truncate ? 'cell-text--truncate' : undefined}
    >
      {value}
    </Text>
  );
}
