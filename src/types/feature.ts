export type Feature = {
  id: string
  name: string
  label: string
  description?: string
  enabled_globally: boolean
  client_overrides: Record<string, boolean>
}

export type FeatureName =
  | 'users'
  | 'usages'
  | 'settings'
  | 'applications'
