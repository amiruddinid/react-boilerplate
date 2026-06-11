import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';

import { useDeleteRolePermissions } from '../api/delete-role-permissions';

const RolePermissionsDelete = ({ id }: { id: number }) => {
  const { addNotification } = useNotifications();
  const deleteRolePermissions = useDeleteRolePermissions({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Role permission is deleted!',
        });
      },
    },
  });
  return (
    <ConfirmationDialog
      icon="danger"
      title="Delete Role Permission"
      body={`Are you sure you want to delete this role permission with id ${id} ?`}
      triggerButton={
        <Button variant="link" className="p-0">
          <Trash className="size-5 text-red-500 hover:underline" />
        </Button>
      }
      confirmButton={
        <Button
          variant="destructive"
          type="button"
          isLoading={deleteRolePermissions.isPending}
          onClick={() => {
            deleteRolePermissions.mutate(id);
          }}
        >
          Delete Role Permission
        </Button>
      }
    />
  );
};

export default RolePermissionsDelete;
