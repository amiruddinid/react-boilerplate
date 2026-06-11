import { useParams } from 'react-router';

import ProductionDetail from '@/features/transaction/production/components/production-detail';

const ProductionDetailRoute = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Production Detail</h1>
      {id && <ProductionDetail id={id} />}
    </div>
  );
};

export default ProductionDetailRoute;
