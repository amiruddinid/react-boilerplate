import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';

import { useRolePermissions } from '../api/get-role-permissions';

import CreateRolePermissions from './role-permissions-create';
import RolePermissionsDelete from './role-permissions-delete';

const RolePermissionsTable = () => {
  const { data, isLoading, error } = useRolePermissions();
  const [isCreating, setIsCreating] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>Error occurred while fetching role permissions data.</div>;

  console.log('Role Permissions Data:', data);

  return (
    <div>
      <div className="mb-4">
        {isCreating ? (
          <div className="rounded-xl border bg-muted/20 p-4 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Add Role Permission</h2>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
            <CreateRolePermissions onClose={() => setIsCreating(false)} />
          </div>
        ) : (
          <Button variant="default" onClick={() => setIsCreating(true)}>
            Add New
          </Button>
        )}
      </div>
      <Table
        data={data?.data}
        columns={[
          {
            title: '',
            Cell: (row) => (
              <div className="flex items-center">
                <RolePermissionsDelete id={row.entry.ID} />
              </div>
            ),
          },
          {
            title: 'ID',
            field: 'ID',
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
            title: 'Function',
            field: 'FUNCTION',
          },
          {
            title: 'Feature',
            field: 'FEATURE',
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

export default RolePermissionsTable;
