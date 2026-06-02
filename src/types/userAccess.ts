export type UserAccess = {
  id: string
  granted_at: string
  user_id: number
  client_id: string
  product: 'PORTAL' | 'STUDIO' | 'ESPACE_SOUVERAIN'
}
