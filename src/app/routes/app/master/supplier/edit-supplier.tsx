import { useParams } from 'react-router';

import EditSupplier from '@/features/master/supplier/components/supplier-edit';

const EditSupplierRoute = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Edit Supplier</h1>
      <p>This is the Edit Supplier page.</p>
      {id && <EditSupplier id={id} />}
    </div>
  );
};

export default EditSupplierRoute;
