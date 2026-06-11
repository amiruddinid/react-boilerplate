import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export const getRoleDetail = (id: string): Promise<any> => {
  return api.get(`/role/${id}`);
};

export const getRoleDetailQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['role-detail', id],
    queryFn: () => getRoleDetail(id),
  });
};

type UseRoleDetailOptions = {
  id: string;
  queryConfig?: QueryConfig<typeof getRoleDetailQueryOptions>;
};

export const useRoleDetail = ({ id, queryConfig }: UseRoleDetailOptions) => {
  return useQuery({
    ...getRoleDetailQueryOptions(id),
    ...queryConfig,
  });
};
