import { z } from 'zod';
import { api } from '@/lib/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MutationConfig } from '@/lib/react-query';

export const createMaterialInputSchema = z.object({
    PART_NUMBER: z.string().min(1, 'Part number is required'), // validasi part number harus string dan tidak kosong
    NAME: z.string().min(1, 'Name is required'), // validasi name harus string dan tidak kosong
    CATEGORY: z.string().min(1, 'Category is required'), // validasi category harus string dan tidak kosong
    UNIT: z.string().min(1, 'Unit is required'), // validasi unit harus string dan tidak kosong
    SUPPLIER_ID: z.string().min(1, 'Supplier ID is required')
});

export type CreateMaterialInput = z.infer<typeof createMaterialInputSchema>;