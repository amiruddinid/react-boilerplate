import { useParams } from 'react-router';

import RoleDetail from '@/features/master/role/components/role-detail';

const RoleDetailRoute = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Role Detail</h1>
      <p>This is the Role Detail page.</p>
      {id && <RoleDetail id={id} />}
    </div>
  );
};

export default RoleDetailRoute;
