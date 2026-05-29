import type { ColumnConfig } from '../../types/column';
import type { User } from '../../types/user';
import { ROLE_OPTIONS } from './users.constants';
import { Avatar, type DecorativeColor } from '../../components/atoms/Avatar/Avatar';
import { Tag } from '../../components/atoms/Tag/Tag';
import { Text } from '../../components/atoms/Text/Text';

type TagStatus = 'positive' | 'neutral' | 'warning';

const DECORATIVE_COLORS: DecorativeColor[] = ['green', 'blue', 'yellow', 'purple', 'pink', 'brown'];

function resolveColor(seed: string, stored?: string | null): DecorativeColor {
  if (stored && (DECORATIVE_COLORS as string[]).includes(stored)) return stored as DecorativeColor;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return DECORATIVE_COLORS[hash % DECORATIVE_COLORS.length];
}

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
    render: (row) => {
      const initials = `${row.first_name?.[0] ?? ''}${row.last_name?.[0] ?? ''}`.toUpperCase() || '?';
      const color = resolveColor(row.id, row.color_decoration);
      console.log('[Avatar color]', row.first_name, '| color_decoration:', row.color_decoration, '| resolved:', color);
      return (
        <div className="table-cell__with-avatar">
          <Avatar fallback={initials} size="compact" colorDecoration={color} />
          <Text as="span" variant="body-medium-default">
            {`${row.first_name} ${row.last_name}`}
          </Text>
        </div>
      );
    },
  },
  {
    key: 'email',
    label: 'Email',
    visible: false,
    render: (row) => (
      <Text as="span" variant="body-medium-default">
        {(row as any).email ?? '–'}
      </Text>
    ),
  },
  {
    key: 'role',
    label: 'Rôle',
    visible: true,
    selectFilter: {
      options: [...ROLE_OPTIONS],
    },
    render: (row) => (
      <Text as="span" variant="body-medium-default">{row.role}</Text>
    ),
  },
  {
    key: 'statut',
    label: 'Statut',
    visible: true,
    selectFilter: {
      options: [
        { value: 'Actif', label: 'Actif' },
        { value: 'Invitation envoyée', label: 'Invitation envoyée' },
      ],
    },
    render: (row) => {
      const tag = getStatutTag(row.statut);
      return <Tag label={tag.label} status={tag.status} size="compact" showDot />;
    },
  },
  {
    key: 'last_activity',
    label: 'Dernière activité',
    visible: true,
    render: (row) => (
      <Text as="span" variant="body-medium-default" color="muted">
        {row.last_activity ?? '–'}
      </Text>
    ),
  },
  {
    key: 'united_used',
    label: 'Unités consommées',
    visible: false,
    render: (row) => (
      <Text as="span" variant="body-medium-default">{row.united_used}</Text>
    ),
  },
  {
    key: 'language',
    label: 'Langue',
    visible: false,
    render: (row) => (
      <Text as="span" variant="body-medium-default">{row.language}</Text>
    ),
  },
];
