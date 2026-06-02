import { User, AtSign, UserCog, Languages, Shield } from 'lucide-react'
import type { FieldConfig } from '../../types/field'

export const usersFields: FieldConfig[] = [
  {
    name: 'first_name',
    type: 'text',
    label: 'Prénom',
    required: true,
    placeholder: 'Prénom',
    autoComplete: 'given-name',
    icon: User,
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
    icon: User,
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
    icon: AtSign,
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
    icon: UserCog,
    options: [
      { value: 'Administrateur', label: 'Administrateur', icon: Shield },
      { value: 'Utilisateur', label: 'Utilisateur', icon: User },
    ]
  },
  {
    name: 'language',
    type: 'select',
    label: 'Langue',
    required: true,
    icon: Languages,
    options: [
      { value: 'Français', label: 'Français' },
      { value: 'Anglais', label: 'Anglais' }
    ]
  }
]
