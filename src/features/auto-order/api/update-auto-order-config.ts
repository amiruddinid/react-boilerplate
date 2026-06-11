import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getAutoOrderConfigQueryOptions } from './get-auto-order-config';

export const updateAutoOrderConfigInputSchema = z.object({
  scheduleTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      'Time must be in HH:MM format (e.g., 15:55)',
    ),
});

export type UpdateAutoOrderConfigInput = z.infer<
  typeof updateAutoOrderConfigInputSchema
>;

export const updateAutoOrderConfig = async ({
  data,
}: {
  data: UpdateAutoOrderConfigInput;
}) => {
  return api.put('/auto-order/config', data);
};

export type UseUpdateAutoOrderConfigOption = {
  mutationConfig?: MutationConfig<typeof updateAutoOrderConfig>;
};

export const useUpdateAutoOrderConfig = ({
  mutationConfig,
}: UseUpdateAutoOrderConfigOption = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getAutoOrderConfigQueryOptions().queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateAutoOrderConfig,
  });
};
