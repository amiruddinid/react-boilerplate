import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getCustomerQueryOptions } from './get-customer';

export const deleteCustomer = async (id: string) => {
  const response = await api.delete(`/customer/${id}`);
  return response.data;
};

export type UseDeleteCustomerOption = {
  mutationConfig?: MutationConfig<typeof deleteCustomer>;
};

export const useDeleteCustomer = ({
  mutationConfig,
}: UseDeleteCustomerOption = {}) => {
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
    mutationFn: deleteCustomer,
  });
};
