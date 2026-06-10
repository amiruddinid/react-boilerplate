import { z } from 'zod';
import { api } from '@/lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutationConfig } from '@/lib/react-query';
import { getMaterialQueryOptions } from './get-material';
import { getMaterialDetailQueryOptions } from './get-material-detail';

export const editMaterialInputSchema = z.object({
    PART_NUMBER: z.string().min(1, 'Part number is required'), // validasi part number harus string dan tidak kosong
    NAME: z.string().min(1, 'Name is required'), // validasi name harus string dan tidak kosong
    CATEGORY: z.string().min(1, 'Category is required'), // validasi category harus string dan tidak kosong
    UNIT: z.string().min(1, 'Unit is required'), // validasi unit harus string dan tidak kosong
    SUPPLIER_ID: z.string().min(1, 'Supplier ID is required')
});

export type editMaterialInput = z.infer<typeof editMaterialInputSchema>;

export const editMaterial = async ({id, data}: {id: string, data: editMaterialInput}) => {
    const response = await api.put(`/material/${id}`, data);
    return response.data;
};

export type UseEditMaterialOption = {
    mutationConfig?: MutationConfig<typeof editMaterial>
} 

export const useEditMaterial = ({
    mutationConfig,
}: UseEditMaterialOption = {}) => {
    const queryClient = useQueryClient();
    const { onSuccess, ...restConfig } = mutationConfig || {}

    return useMutation({
        onSuccess: (data, ...args) => {
            console.log(data);
            queryClient.invalidateQueries({
                queryKey: getMaterialQueryOptions().queryKey,
            }),
            queryClient.invalidateQueries({
                queryKey: getMaterialDetailQueryOptions(data.ID).queryKey,
            }),
            onSuccess?.(data, ...args)
        },
        ...restConfig,
        mutationFn: editMaterial
    })
}