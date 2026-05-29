import type React from 'react';

export type ColumnFilterOption = {
  value: string
  label: string
}

export type ColumnFilter = {
  options: ColumnFilterOption[]
  placeholder?: string
}

export type ColumnConfig<T = any> = {
  key: string
  label: string
  visible: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  render?: (row: T) => React.ReactNode
  filter?: React.ReactNode
  selectFilter?: ColumnFilter
}
