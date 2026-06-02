import { supabase } from '../lib/supabase'
import type { Client } from '../types/client'

export async function getClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
  if (error) throw error
  return data
}

export async function getClientById(id: string): Promise<Client> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function createClient(
  data: Omit<Client, 'id' | 'created_at'>
): Promise<Client> {
  const { data: created, error } = await supabase
    .from('clients')
    .insert(data)
    .select()
    .single()
  if (error) throw error
  return created
}

export async function updateClient(
  id: string,
  data: Partial<Client>
): Promise<Client> {
  const { data: updated, error } = await supabase
    .from('clients')
    .update(data)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return updated
}

export async function deleteClient(id: string): Promise<void> {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id)
  if (error) throw error
}
