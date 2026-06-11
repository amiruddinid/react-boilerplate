import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';

import { useDeleteBom } from '../api/delete-bom';

const BomDelete = ({ id }: { id: string }) => {
  const { addNotification } = useNotifications();
  const deleteBom = useDeleteBom({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'BOM is deleted!',
        });
      },
    },
  });
  return (
    <ConfirmationDialog
      icon="danger"
      title="Delete BOM"
      body={`Are you sure you want to delete this BOM with id ${id} ?`}
      triggerButton={
        <Button variant="link" className="p-0">
          <Trash className="size-5 text-red-500 hover:underline" />
        </Button>
      }
      confirmButton={
        <Button
          variant="destructive"
          type="button"
          isLoading={deleteBom.isPending}
          onClick={() => {
            deleteBom.mutate(id);
          }}
        >
          Delete BOM
        </Button>
      }
    />
  );
};

export default BomDelete;
