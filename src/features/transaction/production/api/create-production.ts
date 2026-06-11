import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getProductionQueryOptions } from './get-production';

export const createProductionInputSchema = z.object({
    CAR_MODEL_ID: z.string().min(1, 'Car Model ID is required'), // ID Model mobil wajib diisi
    VIN: z.string().min(1, 'VIN is required'),                     // Nomor rangka kendaraan wajib diisi
    ENGINE_NUMBER: z.string().min(1, 'Engine number is required')  // Nomor mesin wajib diisi
});

export type CreateProductionInput = z.infer<typeof createProductionInputSchema>;

export const createProduction = async (data: CreateProductionInput) => {
  const response = await api.post('/transaction/production', data);
  return response.data;
};

export type UseCreateProductionOption = {
  mutationConfig?: MutationConfig<typeof createProduction>;
};

export const useCreateProduction = ({
  mutationConfig,
}: UseCreateProductionOption = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      (queryClient.invalidateQueries({
        queryKey: getProductionQueryOptions().queryKey,
      }),
        onSuccess?.(...args));
    },
    ...restConfig,
    mutationFn: createProduction,
  });
};
