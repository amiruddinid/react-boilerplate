import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getCustomerQueryOptions } from './get-customer';
import { getCustomerDetailQueryOptions } from './get-customer-detail';

export const editCustomerInputSchema = z.object({
  CUSTOMER_CODE: z.string().min(1, 'Customer code is required'),
  NAME: z.string().min(1, 'Name is required'),
  TYPE: z.string().min(1, 'Type is required'),
  ADDRESS: z.string().min(1, 'Address is required'),
  PHONE: z.string().min(1, 'Phone is required'),
});

export type EditCustomerInput = z.infer<typeof editCustomerInputSchema>;

export const editCustomer = async ({
  id,
  data,
}: {
  id: string;
  data: EditCustomerInput;
}) => {
  const response = await api.put(`/customer/${id}`, data);
  return response.data;
};

export type UseEditCustomerOption = {
  mutationConfig?: MutationConfig<typeof editCustomer>;
};

export const useEditCustomer = ({
  mutationConfig,
}: UseEditCustomerOption = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      (queryClient.invalidateQueries({
        queryKey: getCustomerQueryOptions().queryKey,
      }),
        queryClient.invalidateQueries({
          queryKey: getCustomerDetailQueryOptions(data.ID).queryKey,
        }),
        onSuccess?.(data, ...args));
    },
    ...restConfig,
    mutationFn: editCustomer,
  });
};
