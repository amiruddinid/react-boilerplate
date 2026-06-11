import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getLogisticQueryOptions } from './get-logistic';

export const deleteLogistic = async (id: string) => {
  const response = await api.delete(`/logistic/${id}`);
  return response.data;
};

export type UseDeleteLogisticOption = {
  mutationConfig?: MutationConfig<typeof deleteLogistic>;
};

export const useDeleteLogistic = ({
  mutationConfig,
}: UseDeleteLogisticOption = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      (queryClient.invalidateQueries({
        queryKey: getLogisticQueryOptions().queryKey,
      }),
        onSuccess?.(...args));
    },
    ...restConfig,
    mutationFn: deleteLogistic,
  });
};
