import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getBomQueryOptions } from './get-bom';
import { getBomDetailQueryOptions } from './get-bom-detail';

export const editBomInputSchema = z.object({
  CAR_MODEL_ID: z.string().min(1, 'Car Model ID is required'),
  INVENTORY_ID: z.string().min(1, 'Inventory ID is required'),
  QTY_REQUIRED: z.number().int().min(1, 'Quantity required must be at least 1'),
});

export type EditBomInput = z.infer<typeof editBomInputSchema>;

export const editBom = async ({
  id,
  data,
}: {
  id: string;
  data: EditBomInput;
}) => {
  const response = await api.put(`/bom/${id}`, data);
  return response.data;
};

export type UseEditBomOption = {
  mutationConfig?: MutationConfig<typeof editBom>;
};

export const useEditBom = ({ mutationConfig }: UseEditBomOption = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      (queryClient.invalidateQueries({
        queryKey: getBomQueryOptions().queryKey,
      }),
        queryClient.invalidateQueries({
          queryKey: getBomDetailQueryOptions(data.ID).queryKey,
        }),
        onSuccess?.(data, ...args));
    },
    ...restConfig,
    mutationFn: editBom,
  });
};
