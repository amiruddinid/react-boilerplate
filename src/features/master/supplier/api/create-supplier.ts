import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getSupplierQueryOptions } from './get-supplier';

export const createSupplierInputSchema = z.object({
  SUPPLIER_CODE: z.string().min(1, 'Supplier code is required'),
  NAME: z.string().min(1, 'Name is required'),
  CONTACT_PERSON: z.string().min(1, 'Contact person is required'),
  PHONE: z.string().min(1, 'Phone is required'),
  ADDRESS: z.string().min(1, 'Address is required'),
  IS_ACTIVE: z.boolean().optional(),
});

export type CreateSupplierInput = z.infer<typeof createSupplierInputSchema>;

export const createSupplier = async (data: CreateSupplierInput) => {
  const response = await api.post('/supplier', data);
  return response.data;
};

export type UseCreateSupplierOption = {
  mutationConfig?: MutationConfig<typeof createSupplier>;
};

export const useCreateSupplier = ({
  mutationConfig,
}: UseCreateSupplierOption = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      (queryClient.invalidateQueries({
        queryKey: getSupplierQueryOptions().queryKey,
      }),
        onSuccess?.(...args));
    },
    ...restConfig,
    mutationFn: createSupplier,
  });
};
