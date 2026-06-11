import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';

import { useDeleteUser } from '../api/delete-user';

const UserDelete = ({ id }: { id: string }) => {
  const { addNotification } = useNotifications();
  const deleteUser = useDeleteUser({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'User is deleted!',
        });
      },
    },
  });
  return (
    <ConfirmationDialog
      icon="danger"
      title="Delete User"
      body={`Are you sure you want to delete user ${id} ?`}
      triggerButton={
        <Button variant="link" className="p-0">
          <Trash className="size-5 text-red-500 hover:underline" />
        </Button>
      }
      confirmButton={
        <Button
          variant="destructive"
          type="button"
          isLoading={deleteUser.isPending}
          onClick={() => {
            deleteUser.mutate(id);
          }}
        >
          Delete User
        </Button>
      }
    />
  );
};

export default UserDelete;
