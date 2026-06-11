import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getUserQueryOptions } from './get-user';
import { getUserDetailQueryOptions } from './get-user-detail';

export const editUserInputSchema = z.object({
  PASSWORD: z.string().optional(),
  NOREG: z.string().min(1, 'Noreg is required').max(10),
  EMAIL: z.string().email('Invalid email address').max(50),
  ROLE_ID: z.number().int().min(1, 'Role ID is required'),
});

export type EditUserInput = z.infer<typeof editUserInputSchema>;

export const editUser = async ({
  id,
  data,
}: {
  id: string;
  data: EditUserInput;
}) => {
  // If PASSWORD is empty string, remove it so backend doesn't try to update it as an empty string.
  const payload = { ...data };
  if (!payload.PASSWORD) {
    delete payload.PASSWORD;
  }
  const response = await api.put(`/user/${id}`, payload);
  return response.data;
};

export type UseEditUserOption = {
  mutationConfig?: MutationConfig<typeof editUser>;
};

export const useEditUser = ({ mutationConfig }: UseEditUserOption = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      (queryClient.invalidateQueries({
        queryKey: getUserQueryOptions().queryKey,
      }),
        queryClient.invalidateQueries({
          queryKey: getUserDetailQueryOptions(data.USERNAME).queryKey,
        }),
        onSuccess?.(data, ...args));
    },
    ...restConfig,
    mutationFn: editUser,
  });
};
