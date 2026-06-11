import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export type AutoOrderConfig = {
  jobName: string;
  scheduleTime: string;
  isActive: boolean;
  changedDt?: string;
  changedBy?: string;
};

export const getAutoOrderConfig = (): Promise<{
  status: number;
  data: AutoOrderConfig;
}> => {
  return api.get('/auto-order/config');
};

export const getAutoOrderConfigQueryOptions = () => {
  return queryOptions({
    queryKey: ['auto-order-config'],
    queryFn: getAutoOrderConfig,
  });
};

type UseAutoOrderConfigOptions = {
  queryConfig?: QueryConfig<typeof getAutoOrderConfigQueryOptions>;
};

export const useAutoOrderConfig = ({
  queryConfig,
}: UseAutoOrderConfigOptions = {}) => {
  return useQuery({
    ...getAutoOrderConfigQueryOptions(),
    ...queryConfig,
  });
};
