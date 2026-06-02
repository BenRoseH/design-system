import { Users, BarChart2, Circle, Settings, Grid } from 'lucide-react'
import type { FeatureName } from '../types/feature'

export type NavItem = {
  label: string
  icon: any
  path: string
  feature?: FeatureName
  externalLink?: boolean
}

export type NavSection = {
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
          path: '/clients',
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
        },
        {
          label: 'Usages',
          icon: BarChart2,
          path: '/usages',
          feature: 'usages'
        },
        {
          label: 'Abonnement',
          icon: Circle,
          path: '/abonnement',
          feature: 'abonnement'
        }
      ]
    },
    {
      label: 'CONFIGURATION',
      items: [
        {
          label: 'Paramètres',
          icon: Settings,
          path: '/settings',
          feature: 'settings',
          externalLink: true
        },
        {
          label: 'Applications',
          icon: Grid,
          path: '/applications',
          feature: 'applications'
        }
      ]
    },
    {
      label: 'ESPACE SOUVERAIN',
      items: [
        {
          label: 'Paramètres',
          icon: Settings,
          path: '/espace-souverain',
          feature: 'espace-souverain',
          externalLink: true
        }
      ]
    }
  ]
}
