import { useParams } from 'react-router';

import EditCustomer from '@/features/master/customer/components/customer-edit';

const EditCustomerRoute = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Edit Customer</h1>
      <p>This is the Edit Customer page.</p>
      {id && <EditCustomer id={id} />}
    </div>
  );
};

export default EditCustomerRoute;
