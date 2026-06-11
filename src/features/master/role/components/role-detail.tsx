import { useRoleDetail } from '../api/get-role-detail';

const RoleDetail = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useRoleDetail({ id });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching role detail data.</div>;

  console.log('Role Detail Data:', data);
  return (
    <div>
      <h1>Role Detail</h1>
      <div className="m-4 rounded-xl border p-4 shadow-lg">
        <div className="mb-4 flex flex-col">
          <p className="w-1/2 py-2 text-xl font-bold">ID: {data?.data.ID} </p>
          <p className="w-1/2 py-2 text-xl font-bold">
            Role Name: {data?.data.ROLE_NAME}{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleDetail;
