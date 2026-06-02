import { useState } from 'react';
import { Table } from '../../atoms/Table/Table';
import { Select } from '../../atoms/Select/Select';
import type { ColumnConfig } from '../../../types/column';
import type { ContextMenuItem } from '../../atoms/ContextMenu/ContextMenu';
import './DataTable.css';

interface DataTableProps<T extends Record<string, any>> {
  columns: ColumnConfig<T>[];
  data: T[];
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  rowActions?: ContextMenuItem[] | ((row: T) => ContextMenuItem[]);
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  loading,
  error,
  emptyMessage,
  onRowClick,
  rowActions,
}: DataTableProps<T>) {
  const [visibilityMap] = useState<Record<string, boolean>>(
    () => Object.fromEntries(columns.map((c) => [c.key, c.visible]))
  );
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  const resolvedColumns = columns.map((c) => ({
    ...c,
    visible: visibilityMap[c.key] ?? c.visible,
  }));

  const visibleColumns = resolvedColumns.filter((c) => c.visible);
  const selectFilterColumns = visibleColumns.filter((c) => c.selectFilter);
  const customFilterNodes = visibleColumns.filter((c) => c.filter);

  const filteredData = data.filter((row) =>
    selectFilterColumns.every((col) => {
      const val = filterValues[col.key];
      if (!val) return true;
      return String(row[col.key]) === val;
    })
  );

  function setFilter(key: string, value: string) {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  }

  const hasToolbar =
    selectFilterColumns.length > 0 || customFilterNodes.length > 0 || true;

  return (
    <div className="data-table">
      {hasToolbar && (
        <div className="data-table__toolbar">
          <div className="data-table__filters">
            {customFilterNodes.map((col) => (
              <span key={col.key}>{col.filter}</span>
            ))}
            {selectFilterColumns.map((col) => (
              <Select
                key={col.key}
                placeholder={col.selectFilter!.placeholder ?? col.label}
                options={[
                  { value: '', label: `Tous (${col.label})` },
                  ...col.selectFilter!.options,
                ]}
                value={filterValues[col.key] ?? ''}
                onChange={(val) => setFilter(col.key, val)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="data-table__body">
        <Table
          columns={resolvedColumns}
          data={filteredData}
          loading={loading}
          error={error}
          emptyMessage={emptyMessage}
          onRowClick={onRowClick}
          rowActions={rowActions}
        />
      </div>
    </div>
  );
}
