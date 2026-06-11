import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';

import { useDeleteLogistic } from '../api/delete-logistic';

const LogisticDelete = ({ id }: { id: string }) => {
  const { addNotification } = useNotifications();
  const deleteLogistic = useDeleteLogistic({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Logistic is deleted!',
        });
      },
    },
  });
  return (
    <ConfirmationDialog
      icon="danger"
      title="Delete Logistic"
      body={`Are you sure you want to delete this logistic with id ${id} ?`}
      triggerButton={
        <Button variant="link" className="p-0">
          <Trash className="size-5 text-red-500 hover:underline" />
        </Button>
      }
      confirmButton={
        <Button
          variant="destructive"
          type="button"
          isLoading={deleteLogistic.isPending}
          onClick={() => {
            deleteLogistic.mutate(id);
          }}
        >
          Delete Logistic
        </Button>
      }
    />
  );
};

export default LogisticDelete;
