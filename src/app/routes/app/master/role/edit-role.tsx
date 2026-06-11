import { useParams } from 'react-router';

import EditRole from '@/features/master/role/components/role-edit';

const EditRoleRoute = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Edit Role</h1>
      <p>This is the Edit Role page.</p>
      {id && <EditRole id={id} />}
    </div>
  );
};

export default EditRoleRoute;
