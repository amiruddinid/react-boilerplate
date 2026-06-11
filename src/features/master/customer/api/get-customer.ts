import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export const getCustomer = (): Promise<any> => {
  return api.get('/customer');
};

export const getCustomerQueryOptions = () => {
  return queryOptions({
    queryKey: ['customer'],
    queryFn: getCustomer,
  });
};

type UseCustomerOptions = {
  queryConfig?: QueryConfig<typeof getCustomerQueryOptions>;
};

export const useCustomer = ({ queryConfig }: UseCustomerOptions = {}) => {
  return useQuery({
    ...getCustomerQueryOptions(),
    ...queryConfig,
  });
};
