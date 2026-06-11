import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getLogisticQueryOptions } from './get-logistic';

export const createLogisticInputSchema = z.object({
  VENDOR_CODE: z.string().min(1, 'Vendor code is required'),
  COMPANY_NAME: z.string().min(1, 'Company name is required'),
  FLEET_TYPE: z.string().min(1, 'Fleet type is required'),
  CONTACT_NUMBER: z.string().min(1, 'Contact number is required'),
});

export type CreateLogisticInput = z.infer<typeof createLogisticInputSchema>;

export const createLogistic = async (data: CreateLogisticInput) => {
  const response = await api.post('/logistic', data);
  return response.data;
};

export type UseCreateLogisticOption = {
  mutationConfig?: MutationConfig<typeof createLogistic>;
};

export const useCreateLogistic = ({
  mutationConfig,
}: UseCreateLogisticOption = {}) => {
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
    mutationFn: createLogistic,
  });
};
