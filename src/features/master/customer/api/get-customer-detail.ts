import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export const getCustomerDetail = (id: string): Promise<any> => {
  return api.get(`/customer/${id}`);
};

export const getCustomerDetailQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['customer-detail', id],
    queryFn: () => getCustomerDetail(id),
  });
};

type UseCustomerDetailOptions = {
  id: string;
  queryConfig?: QueryConfig<typeof getCustomerDetailQueryOptions>;
};

export const useCustomerDetail = ({
  id,
  queryConfig,
}: UseCustomerDetailOptions) => {
  return useQuery({
    ...getCustomerDetailQueryOptions(id),
    ...queryConfig,
  });
};
