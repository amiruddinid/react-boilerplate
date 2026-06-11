import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export const getBomDetail = (id: string): Promise<any> => {
  return api.get(`/bom/${id}`);
};

export const getBomDetailQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['bom-detail', id],
    queryFn: () => getBomDetail(id),
  });
};

type UseBomDetailOptions = {
  id: string;
  queryConfig?: QueryConfig<typeof getBomDetailQueryOptions>;
};

export const useBomDetail = ({ id, queryConfig }: UseBomDetailOptions) => {
  return useQuery({
    ...getBomDetailQueryOptions(id),
    ...queryConfig,
  });
};
