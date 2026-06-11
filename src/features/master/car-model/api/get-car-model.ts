import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client'; //axios
import { QueryConfig } from '@/lib/react-query';

// API Call to get car-model data
export const getCarModel = (): Promise<any> => {
  return api.get('/car-model');
};

// React Query options / config for fetching car-model data
export const getCarModelQueryOptions = () => {
  return queryOptions({
    queryKey: ['car-model'],
    queryFn: getCarModel,
  });
};

// Types for the useCarModel hook options
type UseCarModelOptions = {
  queryConfig?: QueryConfig<typeof getCarModelQueryOptions>;
};

export const useCarModel = ({ queryConfig }: UseCarModelOptions = {}) => {
  return useQuery({
    ...getCarModelQueryOptions(),
    ...queryConfig,
  });
};
