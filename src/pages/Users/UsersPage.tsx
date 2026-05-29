import { useState, useEffect } from 'react';
import { User, Users, BarChart2, Settings, Zap, Bot, ScrollText, Network, Library, Eye, Pencil, Trash2 } from 'lucide-react';
import { GlobalLayout } from '../../components/organisms/GlobalLayout/GlobalLayout';
import { PageHeader } from '../../components/molecules/PageHeader/PageHeader';
import { DataTable } from '../../components/organisms/DataTable/DataTable';
import { MultiSelect } from '../../components/atoms/MultiSelect/MultiSelect';
import { Dialog } from '../../components/atoms/Dialog/Dialog';
import { useQueryClient } from '@tanstack/react-query';
import { useUsers } from '../../hooks/useUsers';
import { assignMissingColors, deleteUser } from '../../services/users';
import { useToast } from '../../components/atoms/Toast/ToastProvider';
import { usersColumns } from './users.columns';
import type { ContextMenuItem } from '../../components/atoms/ContextMenu/ContextMenu';
import type { User as UserType } from '../../types/user';

const navSections = [
  {
    label: 'Organisation',
    items: [
      { label: 'Utilisateurs', icon: User, selected: true, onClick: () => {} },
      { label: 'Groupes', icon: Users, onClick: () => {} },
      { label: 'Usages', icon: BarChart2, onClick: () => {} },
    ],
  },
  {
    label: 'Configuration',
    items: [
      { label: 'Paramètres', icon: Settings, onClick: () => {} },
      { label: 'Connecteurs', icon: Zap, onClick: () => {} },
      { label: "Packs d'agents", icon: Bot, onClick: () => {} },
      { label: 'CGU', icon: ScrollText, onClick: () => {} },
    ],
  },
  {
    label: 'Espace souverain',
    items: [
      { label: 'Espaces de travail', icon: Network, onClick: () => {} },
      { label: 'Bases documentaires', icon: Library, onClick: () => {} },
      { label: 'Paramètres', icon: Settings, onClick: () => {} },
    ],
  },
];

function buildRowActions(row: UserType, onDelete: (user: UserType) => void): ContextMenuItem[] {
  return [
    { type: 'item', label: 'Voir', icon: Eye },
    { type: 'item', label: 'Modifier', icon: Pencil },
    { type: 'separator' },
    {
      type: 'item',
      label: 'Supprimer',
      icon: Trash2,
      destructive: true,
      onClick: () => onDelete(row),
    },
  ];
}

interface UsersPageProps {
  onAddUser?: () => void;
}

export default function UsersPage({ onAddUser }: UsersPageProps = {}) {
  const [statuts, setStatuts] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [userToDelete, setUserToDelete] = useState<UserType | null>(null);
  const [deleting, setDeleting] = useState(false);

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: users, isLoading, error } = useUsers({
    statuts: statuts.length > 0 ? statuts : undefined,
    roles: roles.length > 0 ? roles : undefined,
  });

  useEffect(() => {
    if (!users?.length) return;
    assignMissingColors(users).then((updated) => {
      if (updated) queryClient.invalidateQueries({ queryKey: ['users'] });
    });
  }, [users, queryClient]);

  async function handleConfirmDelete() {
    if (!userToDelete) return;
    const name = `${userToDelete.first_name} ${userToDelete.last_name}`;
    setDeleting(true);
    await deleteUser(userToDelete.id);
    await queryClient.invalidateQueries({ queryKey: ['users'] });
    setDeleting(false);
    setUserToDelete(null);
    toast({ title: `${name} a été supprimé`, variant: 'positive' });
  }

  const navUser = {
    firstName: users?.[0]?.first_name || 'N',
    lastName: users?.[0]?.last_name || 'A',
    company: '',
  };

  const columns = usersColumns.map((col) => ({
    ...col,
    filter:
      col.key === 'statut' ? (
        <MultiSelect
          label="Statuts"
          size="default"
          value={statuts}
          onChange={setStatuts}
          options={[
            { value: 'Actif', label: 'Actif' },
            { value: 'Invitation envoyée', label: 'Invitation envoyée' },
          ]}
        />
      ) : col.key === 'role' ? (
        <MultiSelect
          label="Rôle"
          size="default"
          value={roles}
          onChange={setRoles}
          options={[
            { value: 'Administrateur', label: 'Administrateur' },
            { value: 'Utilisateur', label: 'Utilisateur' },
          ]}
        />
      ) : col.filter,
  }));

  const deleteTarget = userToDelete
    ? `${userToDelete.first_name} ${userToDelete.last_name}`
    : '';

  return (
    <GlobalLayout sections={navSections} user={navUser}>
      <PageHeader
        title="Utilisateurs"
        description="Créez et modifiez les utilisateurs de Live Intelligence."
        primaryAction={onAddUser ? { label: 'Nouvel utilisateur', onClick: onAddUser } : undefined}
      />
      <DataTable
        columns={columns}
        data={users ?? []}
        loading={isLoading}
        error={error ? 'Une erreur est survenue lors du chargement des utilisateurs.' : undefined}
        emptyMessage="Aucun utilisateur trouvé."
        onRowClick={(row) => console.log('row clicked:', row)}
        rowActions={(row) => buildRowActions(row as UserType, setUserToDelete)}
      />

      <Dialog
        open={userToDelete !== null}
        onOpenChange={(open) => { if (!open) setUserToDelete(null); }}
        title="Supprimer l'utilisateur"
        description={`Vous êtes sur le point de supprimer ${deleteTarget}. Cette action est irréversible.`}
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        onConfirm={handleConfirmDelete}
        loading={deleting}
      />
    </GlobalLayout>
  );
}
