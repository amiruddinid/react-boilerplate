import { useParams } from 'react-router';

import SupplierDetail from '@/features/master/supplier/components/supplier-detail';

const SupplierDetailRoute = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Supplier Detail</h1>
      <p>This is the Supplier Detail page.</p>
      {id && <SupplierDetail id={id} />}
    </div>
  );
};

export default SupplierDetailRoute;
