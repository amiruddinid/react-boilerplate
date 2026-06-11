import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client'; //axios
import { QueryConfig } from '@/lib/react-query';

// API Call to get production data
export const getProduction = (): Promise<any> => {
  return api.get('/transaction/production');
};

// React Query options / config for fetching material data
export const getProductionQueryOptions = () => {
  return queryOptions({
    queryKey: ['production'],
    queryFn: getProduction,
  });
};

// Types for the useMaterial hook options
type UseProductionOptions = {
  queryConfig?: QueryConfig<typeof getProductionQueryOptions>;
};

export const useProduction = ({ queryConfig }: UseProductionOptions = {}) => {
  return useQuery({
    ...getProductionQueryOptions(),
    ...queryConfig,
  });
};
