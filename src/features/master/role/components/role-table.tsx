import { EyeIcon, Pencil } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { paths } from '@/config/paths';

import { useRole } from '../api/get-role';

import RoleDelete from './role-delete';

const RoleTable = () => {
  const { data, isLoading, error } = useRole();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching role data.</div>;

  console.log('Role Data:', data);

  return (
    <div>
      <Button
        variant="default"
        className="mb-4"
        onClick={() => navigate(paths.app.masterRoleCreate.getHref())}
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
                <Link to={`/app/master/role/${row.entry.ID}`}>
                  <EyeIcon className="size-5 text-blue-500 hover:underline" />
                </Link>
                <Link to={`/app/master/role/${row.entry.ID}/edit`}>
                  <Pencil className="ml-2 size-5 text-yellow-500 hover:underline" />
                </Link>
                <RoleDelete id={row.entry.ID} />
              </div>
            ),
          },
          {
            title: 'ID',
            field: 'ID',
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

export default RoleTable;
