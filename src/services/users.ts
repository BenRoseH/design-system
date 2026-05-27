import { supabase } from '../lib/supabase'
import type { User } from '../types/user'

type UserFilters = {
  role?: string
  search?: string
}

export async function getUsers(filters?: UserFilters): Promise<User[]> {
  let query = supabase.from('users client').select('*')

  if (filters?.role) {
    query = query.eq('role', filters.role)
  }

  if (filters?.search) {
    query = query.or(
      `first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%`
    )
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

export async function getUserById(id: string): Promise<User> {
  const { data, error } = await supabase
    .from('users client')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function createUser(userData: Omit<User, 'id' | 'created_at'>): Promise<User> {
  const { data, error } = await supabase
    .from('users client')
    .insert(userData)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase.from('users client').delete().eq('id', id)
  if (error) throw error
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User> {
  const { data, error } = await supabase
    .from('users client')
    .update(userData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}
