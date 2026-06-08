import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getClientLicenses,
  getClientLicenseUsage,
  getAllLicenseUsage,
  upsertClientLicense
} from '../services/clientLicenses'
import type { ClientLicense } from '../types/clientLicense'

export function useClientLicenses(clientId: string) {
  return useQuery({
    queryKey: ['client_licenses', clientId],
    queryFn: () => getClientLicenses(clientId),
    enabled: !!clientId
  })
}

export function useClientLicenseUsage(clientId: string) {
  return useQuery({
    queryKey: ['client_license_usage', clientId],
    queryFn: () => getClientLicenseUsage(clientId),
    enabled: !!clientId
  })
}

export function useAllLicenseUsage() {
  return useQuery({
    queryKey: ['client_license_usage'],
    queryFn: getAllLicenseUsage
  })
}

export function useUpsertClientLicense() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ clientId, product, quota }: {
      clientId: string
      product: ClientLicense['product']
      quota: number
    }) => upsertClientLicense(clientId, product, quota),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client_licenses'] })
      queryClient.invalidateQueries({ queryKey: ['client_license_usage'] })
    }
  })
}
