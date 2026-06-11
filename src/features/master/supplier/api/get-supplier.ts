import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export const getSupplier = (): Promise<any> => {
  return api.get('/supplier');
};

export const getSupplierQueryOptions = () => {
  return queryOptions({
    queryKey: ['supplier'],
    queryFn: getSupplier,
  });
};

type UseSupplierOptions = {
  queryConfig?: QueryConfig<typeof getSupplierQueryOptions>;
};

export const useSupplier = ({ queryConfig }: UseSupplierOptions = {}) => {
  return useQuery({
    ...getSupplierQueryOptions(),
    ...queryConfig,
  });
};
