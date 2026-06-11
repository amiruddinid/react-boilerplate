import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export const getLogistic = (): Promise<any> => {
  return api.get('/logistic');
};

export const getLogisticQueryOptions = () => {
  return queryOptions({
    queryKey: ['logistic'],
    queryFn: getLogistic,
  });
};

type UseLogisticOptions = {
  queryConfig?: QueryConfig<typeof getLogisticQueryOptions>;
};

export const useLogistic = ({ queryConfig }: UseLogisticOptions = {}) => {
  return useQuery({
    ...getLogisticQueryOptions(),
    ...queryConfig,
  });
};
