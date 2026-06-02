import { supabase } from '../lib/supabase'
import { UserAccess } from '../types/userAccess'

export async function getUserAccessByUserId(userId: number): Promise<UserAccess[]> {
  const { data, error } = await supabase
    .from('user_access')
    .select('*')
    .eq('user_id', userId)
  if (error) throw error
  return data
}

export async function getUserAccessByClientId(clientId: string): Promise<UserAccess[]> {
  const { data, error } = await supabase
    .from('user_access')
    .select('*')
    .eq('client_id', clientId)
  if (error) throw error
  return data
}

export async function grantAccess(
  userId: number,
  clientId: string,
  product: UserAccess['product']
): Promise<UserAccess> {
  const { data, error } = await supabase
    .from('user_access')
    .insert({ user_id: userId, client_id: clientId, product })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function revokeAccess(id: string): Promise<void> {
  const { error } = await supabase
    .from('user_access')
    .delete()
    .eq('id', id)
  if (error) throw error
}
