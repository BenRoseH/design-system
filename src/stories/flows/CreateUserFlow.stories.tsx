import { useState } from 'react'
import UsersPage from '../../pages/Users/UsersPage'
import { FormPage } from '../../pages/FormPage/FormPage'
import { DynamicForm } from '../../components/organisms/DynamicForm/DynamicForm'
import { usersFields } from '../../pages/Users/users.fields'
import { useCreateUser } from '../../hooks/useUsers'
import { useToast } from '../../components/atoms/Toast/ToastProvider'
import { Check } from 'lucide-react';


export const CreateUserFlow = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [formValid, setFormValid] = useState(false)
    const { mutate, isPending } = useCreateUser()
    const { toast } = useToast()

    function handleSubmit(data: Record<string, string>) {
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
            setOpen(false);
          },
          onError: () => {
            toast({ title: 'Erreur', description: "Impossible de créer l'utilisateur. Réessayez.", variant: 'negative' });
          },
        }
      )
    }

    return (
      <>
        <UsersPage onAddUser={() => setOpen(true)} />
        <FormPage
          title="Nouvel utilisateur"
          isOpen={open}
          onClose={() => setOpen(false)}
          onBack={() => setOpen(false)}
          backLabel="Annuler"
          formId="create-user-form"
          nextLabel="Créer"
          nextIcon={Check}
          nextIconSide="left"
          nextDisabled={!formValid}
        >
          <DynamicForm
            id="create-user-form"
            title="Information"
            fields={usersFields}
            onSubmit={handleSubmit}
            onValidityChange={setFormValid}
          />
        </FormPage>
      </>
    )
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export default {
  title: 'Flows/CreateUser',
}
