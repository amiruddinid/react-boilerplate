import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getLogisticQueryOptions } from './get-logistic';
import { getLogisticDetailQueryOptions } from './get-logistic-detail';

export const editLogisticInputSchema = z.object({
  VENDOR_CODE: z.string().min(1, 'Vendor code is required'),
  COMPANY_NAME: z.string().min(1, 'Company name is required'),
  FLEET_TYPE: z.string().min(1, 'Fleet type is required'),
  CONTACT_NUMBER: z.string().min(1, 'Contact number is required'),
});

export type EditLogisticInput = z.infer<typeof editLogisticInputSchema>;

export const editLogistic = async ({
  id,
  data,
}: {
  id: string;
  data: EditLogisticInput;
}) => {
  const response = await api.put(`/logistic/${id}`, data);
  return response.data;
};

export type UseEditLogisticOption = {
  mutationConfig?: MutationConfig<typeof editLogistic>;
};

export const useEditLogistic = ({
  mutationConfig,
}: UseEditLogisticOption = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      (queryClient.invalidateQueries({
        queryKey: getLogisticQueryOptions().queryKey,
      }),
        queryClient.invalidateQueries({
          queryKey: getLogisticDetailQueryOptions(data.ID).queryKey,
        }),
        onSuccess?.(data, ...args));
    },
    ...restConfig,
    mutationFn: editLogistic,
  });
};
