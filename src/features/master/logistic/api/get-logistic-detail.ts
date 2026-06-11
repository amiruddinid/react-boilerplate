import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export const getLogisticDetail = (id: string): Promise<any> => {
  return api.get(`/logistic/${id}`);
};

export const getLogisticDetailQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['logistic-detail', id],
    queryFn: () => getLogisticDetail(id),
  });
};

type UseLogisticDetailOptions = {
  id: string;
  queryConfig?: QueryConfig<typeof getLogisticDetailQueryOptions>;
};

export const useLogisticDetail = ({
  id,
  queryConfig,
}: UseLogisticDetailOptions) => {
  return useQuery({
    ...getLogisticDetailQueryOptions(id),
    ...queryConfig,
  });
};
