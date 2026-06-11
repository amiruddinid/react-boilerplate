import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getBomQueryOptions } from './get-bom';

export const createBomInputSchema = z.object({
  CAR_MODEL_ID: z.string().min(1, 'Car Model ID is required'),
  INVENTORY_ID: z.string().min(1, 'Inventory ID is required'),
  QTY_REQUIRED: z.number().int().min(1, 'Quantity required must be at least 1'),
});

export type CreateBomInput = z.infer<typeof createBomInputSchema>;

export const createBom = async (data: CreateBomInput) => {
  const response = await api.post('/bom', data);
  return response.data;
};

export type UseCreateBomOption = {
  mutationConfig?: MutationConfig<typeof createBom>;
};

export const useCreateBom = ({ mutationConfig }: UseCreateBomOption = {}) => {
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
    mutationFn: createBom,
  });
};
