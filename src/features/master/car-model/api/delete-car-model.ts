import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getCarModelQueryOptions } from './get-car-model';

export const deleteCarModel = async (id: string) => {
  const response = await api.delete(`/car-model/${id}`);
  return response.data;
};

export type UseDeleteCarModelOption = {
  mutationConfig?: MutationConfig<typeof deleteCarModel>;
};

export const useDeleteCarModel = ({
  mutationConfig,
}: UseDeleteCarModelOption = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      (queryClient.invalidateQueries({
        queryKey: getCarModelQueryOptions().queryKey,
      }),
        onSuccess?.(...args));
    },
    ...restConfig,
    mutationFn: deleteCarModel,
  });
};
