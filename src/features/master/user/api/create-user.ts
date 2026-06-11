import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getUserQueryOptions } from './get-user';

export const createUserInputSchema = z.object({
  USERNAME: z.string().min(1, 'Username is required').max(50),
  PASSWORD: z.string().min(1, 'Password is required'),
  NOREG: z.string().min(1, 'Noreg is required').max(10),
  EMAIL: z.string().email('Invalid email address').max(50),
  ROLE_ID: z.number().int().min(1, 'Role ID is required'),
});

export type CreateUserInput = z.infer<typeof createUserInputSchema>;

export const createUser = async (data: CreateUserInput) => {
  const response = await api.post('/user', data);
  return response.data;
};

export type UseCreateUserOption = {
  mutationConfig?: MutationConfig<typeof createUser>;
};

export const useCreateUser = ({ mutationConfig }: UseCreateUserOption = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      (queryClient.invalidateQueries({
        queryKey: getUserQueryOptions().queryKey,
      }),
        onSuccess?.(...args));
    },
    ...restConfig,
    mutationFn: createUser,
  });
};
