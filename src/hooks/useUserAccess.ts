import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUserAccessByUserId, getUserAccessByClientId, grantAccess, revokeAccess } from '../services/userAccess'

export function useUserAccessByUser(userId: number) {
  return useQuery({
    queryKey: ['user_access', 'user', userId],
    queryFn: () => getUserAccessByUserId(userId),
    enabled: !!userId
  })
}

export function useUserAccessByClient(clientId: string) {
  return useQuery({
    queryKey: ['user_access', 'client', clientId],
    queryFn: () => getUserAccessByClientId(clientId),
    enabled: !!clientId
  })
}

export function useGrantAccess() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ userId, clientId, product }: {
      userId: number,
      clientId: string,
      product: 'PORTAL' | 'STUDIO' | 'ESPACE_SOUVERAIN'
    }) => grantAccess(userId, clientId, product),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user_access'] })
  })
}

export function useRevokeAccess() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: revokeAccess,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user_access'] })
  })
}
