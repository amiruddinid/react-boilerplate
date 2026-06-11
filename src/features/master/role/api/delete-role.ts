import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getRoleQueryOptions } from './get-role';

export const deleteRole = async (id: string) => {
  const response = await api.delete(`/role/${id}`);
  return response.data;
};

export type UseDeleteRoleOption = {
  mutationConfig?: MutationConfig<typeof deleteRole>;
};

export const useDeleteRole = ({ mutationConfig }: UseDeleteRoleOption = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      (queryClient.invalidateQueries({
        queryKey: getRoleQueryOptions().queryKey,
      }),
        onSuccess?.(...args));
    },
    ...restConfig,
    mutationFn: deleteRole,
  });
};
