export type ClientLicense = {
  id: string
  created_at: string
  client_id: string
  product: 'PORTAL' | 'STUDIO' | 'ESPACE_SOUVERAIN'
  quota: number
}

export type ClientLicenseUsage = {
  client_id: string
  product: 'PORTAL' | 'STUDIO' | 'ESPACE_SOUVERAIN'
  quota: number
  used: number
  available: number
}
