import { useParams } from 'react-router';

import UserDetail from '@/features/master/user/components/user-detail';

const UserDetailRoute = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>User Detail</h1>
      <p>This is the User Detail page.</p>
      {id && <UserDetail id={id} />}
    </div>
  );
};

export default UserDetailRoute;
