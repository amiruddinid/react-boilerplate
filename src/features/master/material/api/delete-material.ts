import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getMaterialQueryOptions } from './get-material';

export const deleteMaterial = async (id: string) => {
  const response = await api.delete(`/material/${id}`);
  return response.data;
};

export type UseDeleteMaterialOption = {
  mutationConfig?: MutationConfig<typeof deleteMaterial>;
};

export const useDeleteMaterial = ({
  mutationConfig,
}: UseDeleteMaterialOption = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      (queryClient.invalidateQueries({
        queryKey: getMaterialQueryOptions().queryKey,
      }),
        onSuccess?.(...args));
    },
    ...restConfig,
    mutationFn: deleteMaterial,
  });
};
