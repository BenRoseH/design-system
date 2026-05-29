import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Table } from '../../atoms/Table/Table';
import { Button } from '../../atoms/Button/Button';
import { Select } from '../../atoms/Select/Select';
import { Text } from '../../atoms/Text/Text';
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
  const [visibilityMap, setVisibilityMap] = useState<Record<string, boolean>>(
    () => Object.fromEntries(columns.map((c) => [c.key, c.visible]))
  );
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [configOpen, setConfigOpen] = useState(false);

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

  function toggleColumn(key: string) {
    setVisibilityMap((prev) => ({ ...prev, [key]: !prev[key] }));
  }

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
          <Button
            hierarchy="minimal"
            layout="icon-only"
            icon={SlidersHorizontal}
            aria-label="Configurer les colonnes"
            onClick={() => setConfigOpen((o) => !o)}
          />
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

        {configOpen && (
          <div className="data-table__config-panel">
            <Text as="p" variant="body-medium-strong">Colonnes affichées</Text>
            <ul className="data-table__config-list">
              {resolvedColumns.map((col) => (
                <li key={col.key} className="data-table__config-item">
                  <label className="data-table__config-label">
                    <input
                      type="checkbox"
                      checked={col.visible}
                      onChange={() => toggleColumn(col.key)}
                      className="data-table__config-checkbox"
                    />
                    <Text as="span" variant="body-medium-default">{col.label || col.key}</Text>
                  </label>
                </li>
              ))}
            </ul>
            <div className="data-table__config-footer">
              <Button hierarchy="minimal" layout="text" onClick={() => setConfigOpen(false)}>
                Fermer
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
