import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getSupplierQueryOptions } from './get-supplier';

export const deleteSupplier = async (id: string) => {
  const response = await api.delete(`/supplier/${id}`);
  return response.data;
};

export type UseDeleteSupplierOption = {
  mutationConfig?: MutationConfig<typeof deleteSupplier>;
};

export const useDeleteSupplier = ({
  mutationConfig,
}: UseDeleteSupplierOption = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      (queryClient.invalidateQueries({
        queryKey: getSupplierQueryOptions().queryKey,
      }),
        onSuccess?.(...args));
    },
    ...restConfig,
    mutationFn: deleteSupplier,
  });
};
