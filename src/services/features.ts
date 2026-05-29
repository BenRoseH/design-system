import { supabase } from '../lib/supabase'
import type { Feature } from '../types/feature'

export async function getFeatures(): Promise<Feature[]> {
  const { data, error } = await supabase
    .from('features')
    .select('*')
  if (error) throw error
  return data
}

export function isFeatureEnabled(
  feature: Feature,
  clientId?: string
): boolean {
  if (clientId && feature.client_overrides[clientId] !== undefined) {
    return feature.client_overrides[clientId]
  }
  return feature.enabled_globally
}
