import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client'; //axios
import { QueryConfig } from '@/lib/react-query';

// API Call to get material data
export const getMaterial = (): Promise<any> => {
  return api.get('/material');
};

// React Query options / config for fetching material data
export const getMaterialQueryOptions = () => {
  return queryOptions({
    queryKey: ['material'],
    queryFn: getMaterial,
  });
};

// Types for the useMaterial hook options
type UseMaterialOptions = {
  queryConfig?: QueryConfig<typeof getMaterialQueryOptions>;
};

export const useMaterial = ({ queryConfig }: UseMaterialOptions = {}) => {
  return useQuery({
    ...getMaterialQueryOptions(),
    ...queryConfig,
  });
};
