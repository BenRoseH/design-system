import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { GlobalLayout } from '../../components/organisms/GlobalLayout/GlobalLayout'
import { PageHeader } from '../../components/molecules/PageHeader/PageHeader'
import { DataTable } from '../../components/organisms/DataTable/DataTable'
import { MultiSelect } from '../../components/atoms/MultiSelect/MultiSelect'
import { FormPage } from '../FormPage/FormPage'
import { DynamicForm } from '../../components/organisms/DynamicForm/DynamicForm'
import { useClients, useCreateClient } from '../../hooks/useClients'
import { useToast } from '../../components/atoms/Toast/ToastProvider'
import { clientsColumns } from './clients.columns'
import { clientsFields } from './clients.fields'

export default function ClientsPage() {
  const { data: clients, isLoading, error } = useClients()
  const { mutate: createClient } = useCreateClient()
  const { toast } = useToast()
  const [selectedAccesses, setSelectedAccesses] = useState<string[]>([])
  const [addClientOpen, setAddClientOpen] = useState(false)

  function handleAdd(data: Record<string, any>) {
    createClient(
      {
        name: data.name,
        color_decoration: '',
        admin_count: 0,
        units_used: 0,
        units_total: 0,
        options: [],
        invitations_sent: 0,
        invitations_expired: 0,
        users_blocked: 0,
      },
      {
        onSuccess: () => {
          setAddClientOpen(false)
          toast({ title: `${data.name} a été créé`, variant: 'positive' })
        },
        onError: () => {
          toast({ title: 'Erreur', description: 'Impossible de créer le client.', variant: 'negative' })
        },
      }
    )
  }

  const navUser = {
    firstName: 'N',
    lastName: 'A',
    company: 'Orange Business',
  }

  const accessOptions = useMemo(() => {
    const all = new Set(clients?.flatMap((c) => c.options) ?? [])
    return Array.from(all).map((v) => ({ value: v, label: v }))
  }, [clients])

  const filteredClients = useMemo(() => {
    if (!clients) return []
    if (selectedAccesses.length === 0) return clients
    return clients.filter((c) =>
      selectedAccesses.some((opt) => c.options.includes(opt))
    )
  }, [clients, selectedAccesses])

  const columns = clientsColumns.map((col) => ({
    ...col,
    filter:
      col.key === 'options' ? (
        <MultiSelect
          label="Accès actifs"
          size="default"
          value={selectedAccesses}
          onChange={setSelectedAccesses}
          options={accessOptions}
        />
      ) : col.filter,
  }))

  return (
    <>
      <GlobalLayout activePath="/clients" user={navUser}>
        <PageHeader
          title="Clients"
          description="Gérez les clients de Live Intelligence."
          primaryAction={{ label: 'Ajouter un client', icon: Plus, onClick: () => setAddClientOpen(true) }}
        />
        <DataTable
          columns={columns}
          data={filteredClients}
          loading={isLoading}
          error={error ? 'Une erreur est survenue lors du chargement des clients.' : undefined}
          emptyMessage="Aucun client trouvé."
        />
      </GlobalLayout>

      <FormPage
        title="Nouveau client"
        isOpen={addClientOpen}
        onClose={() => setAddClientOpen(false)}
        nextLabel="Créer le client"
        formId="create-client-form"
      >
        <DynamicForm
          id="create-client-form"
          fields={clientsFields}
          onSubmit={handleAdd}
        />
      </FormPage>
    </>
  )
}
