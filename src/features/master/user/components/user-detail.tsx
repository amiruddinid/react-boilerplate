import { useUserDetail } from '../api/get-user-detail';

const UserDetail = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useUserDetail({ id });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching user detail data.</div>;

  console.log('User Detail Data:', data);
  return (
    <div>
      <h1>User Detail</h1>
      <div className="m-4 rounded-xl border p-4 shadow-lg">
        <div className="mb-4 flex flex-col">
          <p className="w-1/2 py-2 text-xl font-bold">
            Username: {data?.data.USERNAME}{' '}
          </p>
          <p className="w-1/2 py-2 text-xl font-bold">
            Email: {data?.data.EMAIL}{' '}
          </p>
        </div>
        <div className="flex gap-4">
          <p className="w-80 border-b py-2 text-xl font-bold">Noreg</p>
          <p className="border-b py-2 text-xl font-bold">:</p>
          <p className="flex-1 border-b py-2 text-xl font-bold">
            {data?.data.NOREG}{' '}
          </p>
        </div>
        <div className="flex gap-4">
          <p className="w-80 border-b py-2 text-xl font-bold">Role Name</p>
          <p className="border-b py-2 text-xl font-bold">:</p>
          <p className="flex-1 border-b py-2 text-xl font-bold">
            {data?.data.ROLE_NAME}{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
