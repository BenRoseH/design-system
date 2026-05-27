import { Text } from '../Text/Text';
import './TableCell.css';

interface TableCellProps {
  children: React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export function TableCell({ children, width, align = 'left' }: TableCellProps) {
  return (
    <td
      className={`table-cell table-cell--${align}`}
      style={width ? { width } : undefined}
    >
      <Text as="span" variant="body-medium-default">
        {children}
      </Text>
    </td>
  );
}
