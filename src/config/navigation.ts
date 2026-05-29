import { Users } from 'lucide-react'
import type { FeatureName } from '../types/feature'

type NavItem = {
  label: string
  icon: any
  path: string
  feature?: FeatureName
}

type NavSection = {
  label: string
  items: NavItem[]
}

export const navigationConfig: Record<string, NavSection[]> = {
  'orange-business': [
    {
      label: 'ORGANISATION',
      items: [
        {
          label: 'Clients',
          icon: Users,
          path: '/users',
          feature: 'users'
        }
      ]
    }
  ],
  'client': [
    {
      label: 'ORGANISATION',
      items: [
        {
          label: 'Utilisateurs',
          icon: Users,
          path: '/users',
          feature: 'users'
        }
      ]
    }
  ]
}
