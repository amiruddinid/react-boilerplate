import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getRolePermissionsQueryOptions } from './get-role-permissions';

export const deleteRolePermissions = async (id: number) => {
  const response = await api.delete(`/role-permissions/${id}`);
  return response.data;
};

export type UseDeleteRolePermissionsOption = {
  mutationConfig?: MutationConfig<typeof deleteRolePermissions>;
};

export const useDeleteRolePermissions = ({
  mutationConfig,
}: UseDeleteRolePermissionsOption = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      (queryClient.invalidateQueries({
        queryKey: getRolePermissionsQueryOptions().queryKey,
      }),
        onSuccess?.(...args));
    },
    ...restConfig,
    mutationFn: deleteRolePermissions,
  });
};
