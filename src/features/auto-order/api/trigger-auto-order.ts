import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getInventoryStatusQueryOptions } from './get-inventory-status';

export const triggerAutoOrder = async () => {
  return api.post('/auto-order/trigger');
};

export type UseTriggerAutoOrderOption = {
  mutationConfig?: MutationConfig<typeof triggerAutoOrder>;
};

export const useTriggerAutoOrder = ({
  mutationConfig,
}: UseTriggerAutoOrderOption = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      // Invalidate the inventory status queries so that the UI lists updated stocks immediately
      queryClient.invalidateQueries({
        queryKey: getInventoryStatusQueryOptions().queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: triggerAutoOrder,
  });
};
