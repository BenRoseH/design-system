import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Text } from '../Text/Text';
import './TableCells.css';

type SortState = 'asc' | 'desc' | null;

interface CellHeaderProps {
  label: string;
  sortable?: boolean;
  sortState?: SortState;
  onSort?: (next: SortState) => void;
}

function nextSort(current: SortState): SortState {
  if (current === null) return 'asc';
  if (current === 'asc') return 'desc';
  return null;
}

export function CellHeader({ label, sortable = true, sortState = null, onSort }: CellHeaderProps) {
  const SortIcon = sortState === 'asc' ? ArrowUp : sortState === 'desc' ? ArrowDown : ArrowUpDown;

  return (
    <div
      className={`cell-header${sortable ? ' cell-header--sortable' : ''}`}
      onClick={sortable ? () => onSort?.(nextSort(sortState)) : undefined}
      aria-sort={sortState === 'asc' ? 'ascending' : sortState === 'desc' ? 'descending' : undefined}
    >
      <Text as="span" variant="body-small-strong" color="muted">{label}</Text>
      {sortable && (
        <span className={`cell-header__sort-icon${sortState !== null ? ' cell-header__sort-icon--active' : ''}`}>
          <SortIcon size={12} />
        </span>
      )}
    </div>
  );
}
