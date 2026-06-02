import type { ColumnConfig } from '../../types/column';
import type { User } from '../../types/user';
import { ROLE_OPTIONS } from './users.constants';
import { CellAvatar } from '../../components/atoms/TableCells/CellAvatar';
import { CellText } from '../../components/atoms/TableCells/CellText';
import { CellTag } from '../../components/atoms/TableCells/CellTag';
import { CellJauge } from '../../components/atoms/TableCells/CellJauge';

type TagStatus = 'positive' | 'neutral' | 'warning';

const STATUT_TAG: Record<string, { status: TagStatus; label: string }> = {
  'Actif': { status: 'positive', label: 'Actif' },
  'Invitation envoyée': { status: 'warning', label: 'Invitation envoyée' },
};

function getStatutTag(statut: string): { status: TagStatus; label: string } {
  return STATUT_TAG[statut] ?? { status: 'neutral', label: statut || '–' };
}

export const usersColumns: ColumnConfig<User>[] = [
  {
    key: 'name',
    label: 'Utilisateur',
    visible: true,
    render: (row) => (
      <CellAvatar firstName={row.first_name ?? ''} lastName={row.last_name ?? ''} colorDecoration={row.color_decoration} />
    ),
  },
  {
    key: 'email',
    label: 'Email',
    visible: false,
    render: (row) => <CellText value={(row as any).email ?? '–'} />,
  },
  {
    key: 'role',
    label: 'Rôle',
    visible: true,
    sortable: true,
    render: (row) => <CellText value={row.role} />,
  },
  {
    key: 'statut',
    label: 'Statut',
    visible: true,
    render: (row) => {
      const tag = getStatutTag(row.statut);
      return <CellTag tags={[{ label: tag.label, status: tag.status }]} />;
    },
  },
  {
    key: 'last_activity',
    label: 'Dernière activité',
    visible: true,
    render: (row) => <CellText value={row.last_activity || '–'} variant="muted" />,
  },
  {
    key: 'united_used',
    label: 'Consommation',
    visible: true,
    render: (row) => (
      <CellJauge value={row.united_used ?? 0} total={row.united_total ?? 100} />
    ),
  },
  {
    key: 'language',
    label: 'Langue',
    visible: false,
    render: (row) => <CellText value={row.language ?? '–'} />,
  },
];
