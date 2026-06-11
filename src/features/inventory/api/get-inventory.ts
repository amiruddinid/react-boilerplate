import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export type InventoryItem = {
  ID: string;
  MATERIAL_ID: string;
  PART_NUMBER: string;
  MATERIAL_NAME: string;
  MATERIAL_CATEGORY: string;
  MATERIAL_UNIT: string;
  WAREHOUSE_LOCATION: string;
  QUANTITY: number;
  CREATED_DT: string;
  CREATED_BY: string;
};

export const getInventory = (): Promise<{ data: InventoryItem[] } | any> => {
  return api.get('/inventory');
};

export const getInventoryQueryOptions = () => {
  return queryOptions({
    queryKey: ['inventory'],
    queryFn: getInventory,
  });
};

type UseInventoryOptions = {
  queryConfig?: QueryConfig<typeof getInventoryQueryOptions>;
};

export const useInventory = ({ queryConfig }: UseInventoryOptions = {}) => {
  return useQuery({
    ...getInventoryQueryOptions(),
    ...queryConfig,
  });
};
