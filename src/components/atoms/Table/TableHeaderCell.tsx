import { ChevronsUpDown } from 'lucide-react';
import { Text } from '../Text/Text';
import './TableHeaderCell.css';

interface TableHeaderCellProps {
  children?: React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export function TableHeaderCell({ children, width, align = 'left' }: TableHeaderCellProps) {
  return (
    <th
      className={`table-header-cell table-header-cell--${align}`}
      style={width ? { width } : undefined}
    >
      <span className="table-header-cell__content">
        <Text as="span" variant="body-small-strong" color="muted">
          {children}
        </Text>
        {children && (
          <span className="table-header-cell__sort-icon" aria-hidden="true">
            <ChevronsUpDown size={14} strokeWidth={2} color="currentColor" />
          </span>
        )}
      </span>
    </th>
  );
}
