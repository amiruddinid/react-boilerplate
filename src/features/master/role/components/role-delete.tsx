import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';

import { useDeleteRole } from '../api/delete-role';

const RoleDelete = ({ id }: { id: string }) => {
  const { addNotification } = useNotifications();
  const deleteRole = useDeleteRole({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Role is deleted!',
        });
      },
    },
  });
  return (
    <ConfirmationDialog
      icon="danger"
      title="Delete Role"
      body={`Are you sure you want to delete this role with id ${id} ?`}
      triggerButton={
        <Button variant="link" className="p-0">
          <Trash className="size-5 text-red-500 hover:underline" />
        </Button>
      }
      confirmButton={
        <Button
          variant="destructive"
          type="button"
          isLoading={deleteRole.isPending}
          onClick={() => {
            deleteRole.mutate(id);
          }}
        >
          Delete Role
        </Button>
      }
    />
  );
};

export default RoleDelete;
