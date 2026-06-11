import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export const getSupplierDetail = (id: string): Promise<any> => {
  return api.get(`/supplier/${id}`);
};

export const getSupplierDetailQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['supplier-detail', id],
    queryFn: () => getSupplierDetail(id),
  });
};

type UseSupplierDetailOptions = {
  id: string;
  queryConfig?: QueryConfig<typeof getSupplierDetailQueryOptions>;
};

export const useSupplierDetail = ({
  id,
  queryConfig,
}: UseSupplierDetailOptions) => {
  return useQuery({
    ...getSupplierDetailQueryOptions(id),
    ...queryConfig,
  });
};
