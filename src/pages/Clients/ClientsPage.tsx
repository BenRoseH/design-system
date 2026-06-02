import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { GlobalLayout } from '../../components/organisms/GlobalLayout/GlobalLayout'
import { PageHeader } from '../../components/molecules/PageHeader/PageHeader'
import { DataTable } from '../../components/organisms/DataTable/DataTable'
import { MultiSelect } from '../../components/atoms/MultiSelect/MultiSelect'
import { useClients } from '../../hooks/useClients'
import { clientsColumns } from './clients.columns'

export default function ClientsPage() {
  const { data: clients, isLoading, error } = useClients()
  const [selectedAccesses, setSelectedAccesses] = useState<string[]>([])

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
    <GlobalLayout activePath="/clients" user={navUser}>
      <PageHeader
        title="Clients"
        description="Gérez les clients de Live Intelligence."
        primaryAction={{ label: 'Ajouter un client', icon: Plus, onClick: () => {} }}
      />
      <DataTable
        columns={columns}
        data={filteredClients}
        loading={isLoading}
        error={error ? 'Une erreur est survenue lors du chargement des clients.' : undefined}
        emptyMessage="Aucun client trouvé."
      />
    </GlobalLayout>
  )
}
