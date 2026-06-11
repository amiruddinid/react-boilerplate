import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

import { getSupplierQueryOptions } from './get-supplier';
import { getSupplierDetailQueryOptions } from './get-supplier-detail';

export const editSupplierInputSchema = z.object({
  SUPPLIER_CODE: z.string().min(1, 'Supplier code is required'),
  NAME: z.string().min(1, 'Name is required'),
  CONTACT_PERSON: z.string().min(1, 'Contact person is required'),
  PHONE: z.string().min(1, 'Phone is required'),
  ADDRESS: z.string().min(1, 'Address is required'),
  IS_ACTIVE: z.boolean().optional(),
});

export type EditSupplierInput = z.infer<typeof editSupplierInputSchema>;

export const editSupplier = async ({
  id,
  data,
}: {
  id: string;
  data: EditSupplierInput;
}) => {
  const response = await api.put(`/supplier/${id}`, data);
  return response.data;
};

export type UseEditSupplierOption = {
  mutationConfig?: MutationConfig<typeof editSupplier>;
};

export const useEditSupplier = ({
  mutationConfig,
}: UseEditSupplierOption = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      (queryClient.invalidateQueries({
        queryKey: getSupplierQueryOptions().queryKey,
      }),
        queryClient.invalidateQueries({
          queryKey: getSupplierDetailQueryOptions(data.ID).queryKey,
        }),
        onSuccess?.(data, ...args));
    },
    ...restConfig,
    mutationFn: editSupplier,
  });
};
