import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getCarModelQueryOptions } from './get-car-model';
import { getCarModelDetailQueryOptions } from './get-car-model-detail';

export const editCarModelInputSchema = z.object({
  MODEL_CODE: z.string().min(1, 'Model code is required'),
  MODEL_NAME: z.string().min(1, 'Model name is required'),
  COLOR: z.string().min(1, 'Color is required'),
  TRANSMISSION_TYPE: z.string().min(1, 'Transmission type is required'),
});

export type editCarModelInput = z.infer<typeof editCarModelInputSchema>;

export const editCarModel = async ({
  id,
  data,
}: {
  id: string;
  data: editCarModelInput;
}) => {
  const response = await api.put(`/car-model/${id}`, data);
  return response.data;
};

export type UseEditCarModelOption = {
  mutationConfig?: MutationConfig<typeof editCarModel>;
};

export const useEditCarModel = ({
  mutationConfig,
}: UseEditCarModelOption = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      console.log(data);
      (queryClient.invalidateQueries({
        queryKey: getCarModelQueryOptions().queryKey,
      }),
        queryClient.invalidateQueries({
          queryKey: getCarModelDetailQueryOptions(data.ID).queryKey,
        }),
        onSuccess?.(data, ...args));
    },
    ...restConfig,
    mutationFn: editCarModel,
  });
};
