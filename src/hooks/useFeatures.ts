import { useQuery } from '@tanstack/react-query'
import { getFeatures, isFeatureEnabled } from '../services/features'
import type { FeatureName } from '../types/feature'

export function useFeatures(clientId?: string) {
  const { data: features = [], isLoading, error } = useQuery({
    queryKey: ['features', clientId],
    queryFn: getFeatures,
    staleTime: 1000 * 60 * 5
  })

  console.log('features chargées:', features)
  console.log('isLoading:', isLoading)

  if (!isLoading && features.length === 0) {
    console.error('Aucune feature chargée depuis Supabase')
  }

  const hasFeature = (name: FeatureName): boolean => {
    if (isLoading) return true
    const feature = features.find(f => f.name === name)
    if (!feature) return false
    return isFeatureEnabled(feature, clientId)
  }

  const enabledFeatures = features
    .filter(f => isFeatureEnabled(f, clientId))
    .map(f => f.name)

  return { features, enabledFeatures, hasFeature, isLoading, error }
}
