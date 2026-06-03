import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client'; //axios
import { QueryConfig } from '@/lib/react-query';

export const getMaterial = (): Promise<any> => {
    return api.get('/material');
};

export const getMaterialQueryOptions = () => {
    return queryOptions({
        queryKey: ['material'],
        queryFn: getMaterial,
    });
};

type UseMaterialOptions = {
    queryConfig?: QueryConfig<typeof getMaterialQueryOptions>;
};

export const useMaterial = ({ queryConfig }: UseMaterialOptions) => {
    return useQuery({
        ...getMaterialQueryOptions(),
        ...queryConfig,
    });
};