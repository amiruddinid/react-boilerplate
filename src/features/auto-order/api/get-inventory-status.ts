import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export type MaterialInventoryStatus = {
  id: string;
  partNumber: string;
  name: string;
  category: string;
  unit: string;
  totalStock: number;
  isLowStock: boolean;
};

export const getInventoryStatus = (): Promise<{
  status: number;
  data: MaterialInventoryStatus[];
}> => {
  return api.get('/auto-order/inventory-status');
};

export const getInventoryStatusQueryOptions = () => {
  return queryOptions({
    queryKey: ['inventory-status'],
    queryFn: getInventoryStatus,
  });
};

type UseInventoryStatusOptions = {
  queryConfig?: QueryConfig<typeof getInventoryStatusQueryOptions>;
};

export const useInventoryStatus = ({
  queryConfig,
}: UseInventoryStatusOptions = {}) => {
  return useQuery({
    ...getInventoryStatusQueryOptions(),
    ...queryConfig,
  });
};
