import { useParams } from 'react-router';

import CustomerDetail from '@/features/master/customer/components/customer-detail';

const CustomerDetailRoute = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Customer Detail</h1>
      <p>This is the Customer Detail page.</p>
      {id && <CustomerDetail id={id} />}
    </div>
  );
};

export default CustomerDetailRoute;
