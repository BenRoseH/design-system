import { supabase } from '../lib/supabase'
import type { ClientLicense, ClientLicenseUsage } from '../types/clientLicense'

export async function getClientLicenses(clientId: string): Promise<ClientLicense[]> {
  const { data, error } = await supabase
    .from('client_licenses')
    .select('*')
    .eq('client_id', clientId)
  if (error) throw error
  return data
}

export async function getClientLicenseUsage(clientId: string): Promise<ClientLicenseUsage[]> {
  const { data, error } = await supabase
    .from('client_license_usage')
    .select('*')
    .eq('client_id', clientId)
  if (error) throw error
  return data
}

export async function getAllLicenseUsage(): Promise<ClientLicenseUsage[]> {
  const { data, error } = await supabase
    .from('client_license_usage')
    .select('*')
  if (error) throw error
  return data
}

export async function upsertClientLicense(
  clientId: string,
  product: ClientLicense['product'],
  quota: number
): Promise<ClientLicense> {
  const { data, error } = await supabase
    .from('client_licenses')
    .upsert({ client_id: clientId, product, quota })
    .select()
    .single()
  if (error) throw error
  return data
}
