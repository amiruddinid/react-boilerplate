import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export const getUserDetail = (id: string): Promise<any> => {
  return api.get(`/user/${id}`);
};

export const getUserDetailQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['user-detail', id],
    queryFn: () => getUserDetail(id),
  });
};

type UseUserDetailOptions = {
  id: string;
  queryConfig?: QueryConfig<typeof getUserDetailQueryOptions>;
};

export const useUserDetail = ({ id, queryConfig }: UseUserDetailOptions) => {
  return useQuery({
    ...getUserDetailQueryOptions(id),
    ...queryConfig,
  });
};
