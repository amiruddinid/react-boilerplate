import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getCustomerQueryOptions } from './get-customer';

export const createCustomerInputSchema = z.object({
  CUSTOMER_CODE: z.string().min(1, 'Customer code is required'),
  NAME: z.string().min(1, 'Name is required'),
  TYPE: z.string().min(1, 'Type is required'),
  ADDRESS: z.string().min(1, 'Address is required'),
  PHONE: z.string().min(1, 'Phone is required'),
});

export type CreateCustomerInput = z.infer<typeof createCustomerInputSchema>;

export const createCustomer = async (data: CreateCustomerInput) => {
  const response = await api.post('/customer', data);
  return response.data;
};

export type UseCreateCustomerOption = {
  mutationConfig?: MutationConfig<typeof createCustomer>;
};

export const useCreateCustomer = ({
  mutationConfig,
}: UseCreateCustomerOption = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      (queryClient.invalidateQueries({
        queryKey: getCustomerQueryOptions().queryKey,
      }),
        onSuccess?.(...args));
    },
    ...restConfig,
    mutationFn: createCustomer,
  });
};
