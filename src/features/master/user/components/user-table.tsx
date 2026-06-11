import { EyeIcon, Pencil } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { paths } from '@/config/paths';

import { useUser } from '../api/get-user';

import UserDelete from './user-delete';

const UserTable = () => {
  const { data, isLoading, error } = useUser();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching user data.</div>;

  console.log('User Data:', data);

  return (
    <div>
      <Button
        variant="default"
        className="mb-4"
        onClick={() => navigate(paths.app.masterUserCreate.getHref())}
      >
        Add New
      </Button>
      <Table
        data={data?.data}
        columns={[
          {
            title: '',
            Cell: (row) => (
              <div className="flex items-center">
                <Link to={`/app/master/user/${row.entry.USERNAME}`}>
                  <EyeIcon className="size-5 text-blue-500 hover:underline" />
                </Link>
                <Link to={`/app/master/user/${row.entry.USERNAME}/edit`}>
                  <Pencil className="ml-2 size-5 text-yellow-500 hover:underline" />
                </Link>
                <UserDelete id={row.entry.USERNAME} />
              </div>
            ),
          },
          {
            title: 'Username',
            field: 'USERNAME',
          },
          {
            title: 'Noreg',
            field: 'NOREG',
          },
          {
            title: 'Email',
            field: 'EMAIL',
          },
          {
            title: 'Role ID',
            field: 'ROLE_ID',
          },
          {
            title: 'Role Name',
            field: 'ROLE_NAME',
          },
          {
            title: 'Created By',
            field: 'CREATED_BY',
          },
          {
            title: 'Created Date',
            field: 'CREATED_DT',
          },
        ]}
      />
    </div>
  );
};

export default UserTable;
