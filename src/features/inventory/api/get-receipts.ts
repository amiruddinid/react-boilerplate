import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export type ReceiptItem = {
  ID: string;
  RECEIPT_NUMBER: string;
  STATUS: string;
  CREATED_DT: string;
  CREATED_BY: string;
  SUPPLIER_NAME: string;
  SUPPLIER_CODE: string;
  MATERIAL_ID: string;
  MATERIAL_NAME: string;
  MATERIAL_PART_NUMBER: string;
  QUANTITY_RECEIVED: number;
};

export const getReceipts = (): Promise<{ data: ReceiptItem[] } | any> => {
  return api.get('/inventory/receipts');
};

export const getReceiptsQueryOptions = () => {
  return queryOptions({
    queryKey: ['inventory-receipts'],
    queryFn: getReceipts,
  });
};

type UseReceiptsOptions = {
  queryConfig?: QueryConfig<typeof getReceiptsQueryOptions>;
};

export const useReceipts = ({ queryConfig }: UseReceiptsOptions = {}) => {
  return useQuery({
    ...getReceiptsQueryOptions(),
    ...queryConfig,
  });
};
