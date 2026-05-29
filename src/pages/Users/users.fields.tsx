import type { FieldConfig } from '../../types/field'
import { ROLE_OPTIONS } from './users.constants'

export const usersFields: FieldConfig[] = [
  {
    name: 'first_name',
    type: 'text',
    label: 'Prénom',
    required: true,
    placeholder: 'Prénom',
    autoComplete: 'given-name',
    validation: {
      minLength: { value: 2, message: 'Minimum 2 caractères' }
    }
  },
  {
    name: 'last_name',
    type: 'text',
    label: 'Nom',
    required: true,
    placeholder: 'Nom',
    autoComplete: 'family-name',
    validation: {
      minLength: { value: 2, message: 'Minimum 2 caractères' }
    }
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    required: true,
    placeholder: 'prenom.nom@entreprise.com',
    autoComplete: 'email',
    validation: {
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Format email invalide'
      }
    }
  },
  {
    name: 'role',
    type: 'select',
    label: 'Rôle',
    required: true,
    options: [...ROLE_OPTIONS]
  },
  {
    name: 'language',
    type: 'select',
    label: 'Langue',
    required: true,
    options: [
      { value: 'Français', label: 'Français' },
      { value: 'Anglais', label: 'Anglais' }
    ]
  }
]
