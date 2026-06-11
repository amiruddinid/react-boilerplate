import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getRoleQueryOptions } from './get-role';

export const createRoleInputSchema = z.object({
  ROLE_NAME: z.string().min(1, 'Role name is required'),
});

export type CreateRoleInput = z.infer<typeof createRoleInputSchema>;

export const createRole = async (data: CreateRoleInput) => {
  const response = await api.post('/role', data);
  return response.data;
};

export type UseCreateRoleOption = {
  mutationConfig?: MutationConfig<typeof createRole>;
};

export const useCreateRole = ({ mutationConfig }: UseCreateRoleOption = {}) => {
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
    mutationFn: createRole,
  });
};
