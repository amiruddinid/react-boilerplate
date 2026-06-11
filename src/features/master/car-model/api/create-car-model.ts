import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getCarModelQueryOptions } from './get-car-model';

export const createCarModelInputSchema = z.object({
  MODEL_CODE: z.string().min(1, 'Model code is required'),
  MODEL_NAME: z.string().min(1, 'Model name is required'),
  COLOR: z.string().min(1, 'Color is required'),
  TRANSMISSION_TYPE: z.string().min(1, 'Transmission type is required'),
});

export type CreateCarModelInput = z.infer<typeof createCarModelInputSchema>;

export const createCarModel = async (data: CreateCarModelInput) => {
  const response = await api.post('/car-model', data);
  return response.data;
};

export type UseCreateCarModelOption = {
  mutationConfig?: MutationConfig<typeof createCarModel>;
};

export const useCreateCarModel = ({
  mutationConfig,
}: UseCreateCarModelOption = {}) => {
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
    mutationFn: createCarModel,
  });
};
