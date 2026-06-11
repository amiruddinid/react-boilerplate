import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client'; //axios
import { QueryConfig } from '@/lib/react-query';

// API Call to get car-model data
export const getCarModelDetail = (id: string): Promise<any> => {
  return api.get(`/car-model/${id}`);
};

// React Query options / config for fetching car-model data
export const getCarModelDetailQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['car-model-detail', id],
    queryFn: () => getCarModelDetail(id),
  });
};

// Types for the useCarModel hook options
type UseCarModelDetailOptions = {
  id: string;
  queryConfig?: QueryConfig<typeof getCarModelDetailQueryOptions>;
};

export const useCarModelDetail = ({
  id,
  queryConfig,
}: UseCarModelDetailOptions) => {
  return useQuery({
    ...getCarModelDetailQueryOptions(id),
    ...queryConfig,
  });
};
