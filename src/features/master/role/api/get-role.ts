import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export const getRole = (): Promise<any> => {
  return api.get('/role');
};

export const getRoleQueryOptions = () => {
  return queryOptions({
    queryKey: ['role'],
    queryFn: getRole,
  });
};

type UseRoleOptions = {
  queryConfig?: QueryConfig<typeof getRoleQueryOptions>;
};

export const useRole = ({ queryConfig }: UseRoleOptions = {}) => {
  return useQuery({
    ...getRoleQueryOptions(),
    ...queryConfig,
  });
};
