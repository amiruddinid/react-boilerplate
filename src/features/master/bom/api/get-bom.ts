import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export const getBom = (): Promise<any> => {
  return api.get('/bom');
};

export const getBomQueryOptions = () => {
  return queryOptions({
    queryKey: ['bom'],
    queryFn: getBom,
  });
};

type UseBomOptions = {
  queryConfig?: QueryConfig<typeof getBomQueryOptions>;
};

export const useBom = ({ queryConfig }: UseBomOptions = {}) => {
  return useQuery({
    ...getBomQueryOptions(),
    ...queryConfig,
  });
};
