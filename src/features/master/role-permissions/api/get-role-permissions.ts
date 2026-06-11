import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export const getRolePermissions = (): Promise<any> => {
  return api.get('/role-permissions');
};

export const getRolePermissionsQueryOptions = () => {
  return queryOptions({
    queryKey: ['role-permissions'],
    queryFn: getRolePermissions,
  });
};

type UseRolePermissionsOptions = {
  queryConfig?: QueryConfig<typeof getRolePermissionsQueryOptions>;
};

export const useRolePermissions = ({
  queryConfig,
}: UseRolePermissionsOptions = {}) => {
  return useQuery({
    ...getRolePermissionsQueryOptions(),
    ...queryConfig,
  });
};
