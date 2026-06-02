import { useState, useEffect } from 'react';
import { Eye, Pencil, Trash2, UserPlus } from 'lucide-react';
import { GlobalLayout } from '../../components/organisms/GlobalLayout/GlobalLayout';
import { PageHeader } from '../../components/molecules/PageHeader/PageHeader';
import { DataTable } from '../../components/organisms/DataTable/DataTable';
import { MultiSelect } from '../../components/atoms/MultiSelect/MultiSelect';
import { Dialog } from '../../components/atoms/Dialog/Dialog';
import { UserDrawer } from '../../components/organisms/UserDrawer/UserDrawer';
import { useQueryClient } from '@tanstack/react-query';
import { useUsers } from '../../hooks/useUsers';
import { assignMissingColors, createUser, deleteUser, randomDecorativeColor, updateUser } from '../../services/users';
import { useToast } from '../../components/atoms/Toast/ToastProvider';
import { usersColumns } from './users.columns';
import type { ContextMenuItem } from '../../components/atoms/ContextMenu/ContextMenu';
import type { User as UserType } from '../../types/user';

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

export default function UsersPage() {
  const [statuts, setStatuts] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [userToDelete, setUserToDelete] = useState<UserType | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [addUserOpen, setAddUserOpen] = useState(false);

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

  async function handleAdd(data: Pick<UserType, 'first_name' | 'last_name' | 'email' | 'role' | 'language'>) {
    await createUser({
      ...data,
      color_decoration: randomDecorativeColor(),
      statut: 'Invitation envoyée',
      last_activity: '',
      united_used: 0,
      united_total: 100,
    });
    await queryClient.invalidateQueries({ queryKey: ['users'] });
    setAddUserOpen(false);
    toast({ title: `${data.first_name} ${data.last_name} a été créé`, variant: 'positive' });
  }

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
    company: 'Leroy Merlin',
    colorDecoration: users?.[0]?.color_decoration,
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
    <GlobalLayout activePath="/users" user={navUser}>
      <PageHeader
        title="Utilisateurs"
        description="Créez et modifiez les utilisateurs de Live Intelligence."
        primaryAction={{ label: 'Ajouter un utilisateur', icon: UserPlus, onClick: () => setAddUserOpen(true) }}
      />
      <DataTable
        columns={columns}
        data={users ?? []}
        loading={isLoading}
        error={error ? 'Une erreur est survenue lors du chargement des utilisateurs.' : undefined}
        emptyMessage="Aucun utilisateur trouvé."
        onRowClick={(row) => setSelectedUser(row as UserType)}
        rowActions={(row) => buildRowActions(row as UserType, setUserToDelete)}
      />

      <UserDrawer
        user={selectedUser}
        createOpen={addUserOpen}
        onClose={() => { setSelectedUser(null); setAddUserOpen(false); }}
        onAdd={handleAdd}
        onDelete={setUserToDelete}
        onEdit={async (updated) => {
          await updateUser(updated.id, {
            first_name: updated.first_name,
            last_name: updated.last_name,
            email: updated.email,
            role: updated.role,
            language: updated.language,
          });
          await queryClient.invalidateQueries({ queryKey: ['users'] });
          toast({ title: `${updated.first_name} ${updated.last_name} a été modifié`, variant: 'positive' });
        }}
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
