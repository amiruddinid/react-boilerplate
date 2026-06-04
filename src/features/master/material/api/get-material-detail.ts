import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client'; //axios
import { QueryConfig } from '@/lib/react-query';

// API Call to get material data
export const getMaterialDetail = (id: string): Promise<any> => {
  return api.get(`/material/${id}`);
};

// React Query options / config for fetching material data
export const getMaterialDetailQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['material-detail', id],
    queryFn: () => getMaterialDetail(id),
  });
};

// Types for the useMaterial hook options
type UseMaterialDetailOptions = {
  id: string;
  queryConfig?: QueryConfig<typeof getMaterialDetailQueryOptions>;
};

export const useMaterialDetail = ({
  id,
  queryConfig,
}: UseMaterialDetailOptions) => {
  return useQuery({
    ...getMaterialDetailQueryOptions(id),
    ...queryConfig,
  });
};
