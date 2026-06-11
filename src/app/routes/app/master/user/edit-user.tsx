import { useParams } from 'react-router';

import EditUser from '@/features/master/user/components/user-edit';

const EditUserRoute = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Edit User</h1>
      <p>This is the Edit User page.</p>
      {id && <EditUser id={id} />}
    </div>
  );
};

export default EditUserRoute;
