import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client'; //axios
import { QueryConfig } from '@/lib/react-query';

// API Call to get material data
export const getProductionDetail = (id: string): Promise<any> => {
  return api.get(`/transaction/production/${id}`);
};

// React Query options / config for fetching material data
export const getProductionDetailQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['production-detail', id],
    queryFn: () => getProductionDetail(id),
  });
};

// Types for the useProduction hook options
type UseProductionDetailOptions = {
  id: string;
  queryConfig?: QueryConfig<typeof getProductionDetailQueryOptions>;
};

export const useProductionDetail = ({
  id,
  queryConfig,
}: UseProductionDetailOptions) => {
  return useQuery({
    ...getProductionDetailQueryOptions(id),
    ...queryConfig,
  });
};
