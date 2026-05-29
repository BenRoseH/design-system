import { TableHeaderCell } from './TableHeaderCell';
import { TableCell } from './TableCell';
import { TableRow } from './TableRow';
import { TableHeaderRow } from './TableHeaderRow';
import { ActionMenu } from '../ActionMenu/ActionMenu';
import { Text } from '../Text/Text';
import type { ContextMenuItem } from '../ContextMenu/ContextMenu';
import type { ColumnConfig } from '../../../types/column';
import './Table.css';

interface TableProps<T extends Record<string, any>> {
  columns: ColumnConfig<T>[];
  data: T[];
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  rowActions?: ContextMenuItem[] | ((row: T) => ContextMenuItem[]);
}

function SkeletonRow({ count }: { count: number }) {
  return (
    <tr>
      {Array.from({ length: count }, (_, i) => (
        <td key={i} className="table-skeleton__cell">
          <span className="table-skeleton__bar" />
        </td>
      ))}
    </tr>
  );
}

export function Table<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  error,
  emptyMessage = 'Aucune donnée disponible',
  onRowClick,
  rowActions,
}: TableProps<T>) {
  const visibleColumns = columns.filter((c) => c.visible);
  const colCount = visibleColumns.length + (rowActions ? 1 : 0);

  function resolveActions(row: T): ContextMenuItem[] | null {
    if (!rowActions) return null;
    return typeof rowActions === 'function' ? rowActions(row) : rowActions;
  }

  function renderBody() {
    if (loading) {
      return Array.from({ length: 3 }, (_, i) => (
        <SkeletonRow key={i} count={colCount} />
      ));
    }
    if (error) {
      return (
        <tr>
          <td colSpan={colCount} className="table-state__cell">
            <Text as="span" color="muted">{error}</Text>
          </td>
        </tr>
      );
    }
    if (!data || data.length === 0) {
      return (
        <tr>
          <td colSpan={colCount} className="table-state__cell">
            <Text as="span" color="muted">{emptyMessage}</Text>
          </td>
        </tr>
      );
    }
    return data.map((row, i) => {
      const actions = resolveActions(row);
      return (
        <TableRow key={row.id ?? i} onClick={onRowClick ? () => onRowClick(row) : undefined}>
          {visibleColumns.map((col) => (
            <TableCell key={col.key} align={col.align}>
              {col.render ? col.render(row) : row[col.key]}
            </TableCell>
          ))}
          {actions && (
            <TableCell align="center">
              <ActionMenu items={actions} />
            </TableCell>
          )}
        </TableRow>
      );
    });
  }

  return (
    <table className="table">
      <colgroup>
        {visibleColumns.map((col) => (
          <col key={col.key} style={col.width ? { width: col.width } : undefined} />
        ))}
        {rowActions && <col style={{ width: '48px' }} />}
      </colgroup>
      <thead>
        <TableHeaderRow>
          {visibleColumns.map((col) => (
            <TableHeaderCell key={col.key} align={col.align}>
              {col.label}
            </TableHeaderCell>
          ))}
          {rowActions && <TableHeaderCell align="center" width="48px" />}
        </TableHeaderRow>
      </thead>
      <tbody>{renderBody()}</tbody>
    </table>
  );
}
