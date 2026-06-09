import { z } from 'zod';
import { api } from '@/lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutationConfig } from '@/lib/react-query';
import { getMaterialQueryOptions } from './get-material';

export const createMaterialInputSchema = z.object({
    PART_NUMBER: z.string().min(1, 'Part number is required'), // validasi part number harus string dan tidak kosong
    NAME: z.string().min(1, 'Name is required'), // validasi name harus string dan tidak kosong
    CATEGORY: z.string().min(1, 'Category is required'), // validasi category harus string dan tidak kosong
    UNIT: z.string().min(1, 'Unit is required'), // validasi unit harus string dan tidak kosong
    SUPPLIER_ID: z.string().min(1, 'Supplier ID is required')
});

export type CreateMaterialInput = z.infer<typeof createMaterialInputSchema>;

export const createMaterial = async (data: CreateMaterialInput) => {
    const response = await api.post('/material', data);
    return response.data;
};

export type UseCreateMaterialOption = {
    mutationConfig?: MutationConfig<typeof createMaterial>
} 

export const useCreateMaterial = ({
    mutationConfig,
}: UseCreateMaterialOption = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: getMaterialQueryOptions().queryKey,
            }),
            onSuccess?.(...args)
        },
        ...restConfig,
        mutationFn: createMaterial
    })
}