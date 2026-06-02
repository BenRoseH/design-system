import { Building2 } from 'lucide-react'
import type { FieldConfig } from '../../types/field'

export const clientsFields: FieldConfig[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Nom du client',
    required: true,
    placeholder: 'Nom de l\'organisation',
    icon: Building2,
    validation: {
      minLength: { value: 2, message: 'Minimum 2 caractères' },
    },
  },
]
