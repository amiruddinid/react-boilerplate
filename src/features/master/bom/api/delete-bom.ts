import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getBomQueryOptions } from './get-bom';

export const deleteBom = async (id: string) => {
  const response = await api.delete(`/bom/${id}`);
  return response.data;
};

export type UseDeleteBomOption = {
  mutationConfig?: MutationConfig<typeof deleteBom>;
};

export const useDeleteBom = ({ mutationConfig }: UseDeleteBomOption = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      (queryClient.invalidateQueries({
        queryKey: getBomQueryOptions().queryKey,
      }),
        onSuccess?.(...args));
    },
    ...restConfig,
    mutationFn: deleteBom,
  });
};
