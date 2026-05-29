import { supabase } from '../lib/supabase'
import type { User } from '../types/user'

const DECORATIVE_COLORS = ['green', 'blue', 'yellow', 'purple', 'pink', 'brown'] as const;

export function randomDecorativeColor(): string {
  return DECORATIVE_COLORS[Math.floor(Math.random() * DECORATIVE_COLORS.length)];
}

export async function assignMissingColors(users: User[]): Promise<boolean> {
  const uncolored = users.filter((u) => !u.color_decoration);
  if (uncolored.length === 0) return false;
  await Promise.all(
    uncolored.map((u) =>
      supabase.from('users client').update({ color_decoration: randomDecorativeColor() }).eq('id', u.id)
    )
  );
  return true;
}

type UserFilters = {
  roles?: string[]
  statuts?: string[]
  search?: string
}

export async function getUsers(filters?: UserFilters): Promise<User[]> {
  let query = supabase.from('users client').select('*')

  if (filters?.roles && filters.roles.length > 0) {
    query = query.in('role', filters.roles)
  }

  if (filters?.statuts && filters.statuts.length > 0) {
    query = query.in('statut', filters.statuts)
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
    .insert({ color_decoration: randomDecorativeColor(), ...userData })
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
