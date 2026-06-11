import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getRoleQueryOptions } from './get-role';
import { getRoleDetailQueryOptions } from './get-role-detail';

export const editRoleInputSchema = z.object({
  ROLE_NAME: z.string().min(1, 'Role name is required'),
});

export type EditRoleInput = z.infer<typeof editRoleInputSchema>;

export const editRole = async ({
  id,
  data,
}: {
  id: string;
  data: EditRoleInput;
}) => {
  const response = await api.put(`/role/${id}`, data);
  return response.data;
};

export type UseEditRoleOption = {
  mutationConfig?: MutationConfig<typeof editRole>;
};

export const useEditRole = ({ mutationConfig }: UseEditRoleOption = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      (queryClient.invalidateQueries({
        queryKey: getRoleQueryOptions().queryKey,
      }),
        queryClient.invalidateQueries({
          queryKey: getRoleDetailQueryOptions(data.ID).queryKey,
        }),
        onSuccess?.(data, ...args));
    },
    ...restConfig,
    mutationFn: editRole,
  });
};
