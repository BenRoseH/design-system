export type Client = {
  id: string
  created_at: string
  name: string
  color_decoration?: string
  admin_count: number
  licences_li_used?: number
  licences_li_total?: number
  licences_es_used?: number
  licences_es_total?: number
  units_used: number
  units_total: number
  options: string[]
  invitations_sent: number
  invitations_expired: number
  users_blocked: number
}
