import { AlertTriangle, Edit, Eye, Lock, Mail, MailX, Trash2, UserX, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Client } from '../../types/client'
import type { ColumnConfig } from '../../types/column'
import { CellAvatar, CellText, CellJauge, CellTag, CellAccess, CellMore } from '../../components/atoms/TableCells'

const parseOptions = (options: any): string[] => {
  if (Array.isArray(options)) return options
  if (typeof options === 'string') {
    return options
      .replace('{', '')
      .replace('}', '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
  }
  return []
}

const OPTION_ICONS: Record<string, LucideIcon> = {
  SSO: Lock,
  LLMaaS: Zap,
}

export const clientsColumns: ColumnConfig<Client>[] = [
  {
    key: 'name',
    label: 'Client',
    visible: true,
    render: (row) => (
      <CellAvatar
        firstName={row.name.split(' ')[0]}
        lastName={row.name.split(' ').slice(1).join(' ')}
        colorDecoration={row.color_decoration}
      />
    ),
  },
  {
    key: 'admin_count',
    label: 'Admins',
    visible: true,
    width: '80px',
    render: (row) =>
      row.admin_count === 0 ? (
        <span className="cell-warning-value">
          0
          <AlertTriangle size={12} />
        </span>
      ) : (
        <CellText value={row.admin_count} />
      ),
  },
  {
    key: 'licences_li',
    label: 'Accès Portal',
    visible: true,
    render: (row) => (
      <CellJauge
        value={row.licences_li_used ?? 0}
        total={row.licences_li_total ?? 0}
      />
    ),
  },
  {
    key: 'licences_es',
    label: 'Accès ES',
    visible: true,
    render: (row) => (
      <CellJauge
        value={row.licences_es_used ?? 0}
        total={row.licences_es_total ?? 0}
      />
    ),
  },
  {
    key: 'units',
    label: 'Unités consommées',
    visible: true,
    render: (row) => (
      <CellJauge
        value={row.units_used}
        total={row.units_total}
      />
    ),
  },
  {
    key: 'status',
    label: 'Statuts',
    visible: true,
    render: (row) => (
      <CellTag tags={[
        ...(row.invitations_sent > 0 ? [{ label: `${row.invitations_sent}`, status: 'info' as const, icon: Mail }] : []),
        ...(row.invitations_expired > 0 ? [{ label: `${row.invitations_expired}`, status: 'warning' as const, icon: MailX }] : []),
        ...(row.users_blocked > 0 ? [{ label: `${row.users_blocked}`, status: 'negative' as const, icon: UserX }] : []),
      ]} />
    ),
  },
  {
    key: 'options',
    label: 'Options activées',
    visible: true,
    render: (row) => (
      <CellAccess
        accesses={parseOptions(row.options).map((opt) => ({
          label: opt,
          icon: OPTION_ICONS[opt],
        }))}
      />
    ),
  },
  {
    key: 'actions',
    label: '',
    visible: true,
    width: '48px',
    align: 'center' as const,
    render: (row) => (
      <CellMore items={[
        { label: 'Voir', icon: Eye, onClick: () => console.log('voir', row.id) },
        { label: 'Modifier', icon: Edit, onClick: () => console.log('modifier', row.id) },
        { label: 'Supprimer', icon: Trash2, onClick: () => console.log('supprimer', row.id), destructive: true },
      ]} />
    ),
  },
]
