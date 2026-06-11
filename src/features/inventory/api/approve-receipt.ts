import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getInventoryQueryOptions } from './get-inventory';
import { getReceiptsQueryOptions } from './get-receipts';

export const approveReceipt = async (id: string) => {
  return api.post(`/inventory/approve/${id}`);
};

export type UseApproveReceiptOption = {
  mutationConfig?: MutationConfig<typeof approveReceipt>;
};

export const useApproveReceipt = ({
  mutationConfig,
}: UseApproveReceiptOption = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, variables, ...args) => {
      // Invalidate both inventory stock lists and receipt lists
      queryClient.invalidateQueries({
        queryKey: getInventoryQueryOptions().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getReceiptsQueryOptions().queryKey,
      });
      onSuccess?.(data, variables, ...args);
    },
    ...restConfig,
    mutationFn: approveReceipt,
  });
};
