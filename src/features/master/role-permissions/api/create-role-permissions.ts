import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getRolePermissionsQueryOptions } from './get-role-permissions';

export const createRolePermissionsInputSchema = z.object({
  ROLE_ID: z.number().int().min(1, 'Role ID is required'),
  FUNCTION: z.string().min(1, 'Function is required'),
  FEATURE: z.string().min(1, 'Feature is required'),
});

export type CreateRolePermissionsInput = z.infer<
  typeof createRolePermissionsInputSchema
>;

export const createRolePermissions = async (
  data: CreateRolePermissionsInput,
) => {
  const response = await api.post('/role-permissions', data);
  return response.data;
};

export type UseCreateRolePermissionsOption = {
  mutationConfig?: MutationConfig<typeof createRolePermissions>;
};

export const useCreateRolePermissions = ({
  mutationConfig,
}: UseCreateRolePermissionsOption = {}) => {
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
    mutationFn: createRolePermissions,
  });
};
