import { GlobalLayout } from '../../components/organisms/GlobalLayout/GlobalLayout';
import { PageHeader } from '../../components/molecules/PageHeader/PageHeader';
import { DynamicForm } from '../../components/organisms/DynamicForm/DynamicForm';
import { useCreateUser } from '../../hooks/useUsers';
import { useToast } from '../../components/atoms/Toast/ToastProvider';
import { usersFields } from './users.fields';
import './CreateUserPage.css';

const navUser = { firstName: '', lastName: '', company: '' };

interface CreateUserPageProps {
  onCancel: () => void;
  onSuccess: () => void;
}

export default function CreateUserPage({ onSuccess }: CreateUserPageProps) {
  const { mutate } = useCreateUser();
  const { toast } = useToast();

  function handleSubmit(data: Record<string, any>) {
    mutate(
      {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        role: data.role,
        language: data.language,
        color_decoration: '',
        statut: 'Invitation envoyée',
        last_activity: '',
        united_used: 0,
        united_total: 0,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Utilisateur créé',
            description: `${data.first_name} ${data.last_name} a été ajouté avec succès.`,
            variant: 'positive',
          });
          onSuccess();
        },
        onError: () => {
          toast({
            title: 'Erreur',
            description: 'Impossible de créer l\'utilisateur. Réessayez.',
            variant: 'negative',
          });
        },
      }
    );
  }

  return (
    <GlobalLayout activePath="/users" user={navUser}>
      <PageHeader
        title="Nouvel utilisateur"
        description="Renseignez les informations du nouvel utilisateur."
      />
      <div className="create-user-page__form">
        <DynamicForm
          fields={usersFields}
          onSubmit={handleSubmit}
        />
      </div>
    </GlobalLayout>
  );
}
