import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';

import { useDeleteSupplier } from '../api/delete-supplier';

const SupplierDelete = ({ id }: { id: string }) => {
  const { addNotification } = useNotifications();
  const deleteSupplier = useDeleteSupplier({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Supplier is deleted!',
        });
      },
    },
  });
  return (
    <ConfirmationDialog
      icon="danger"
      title="Delete Supplier"
      body={`Are you sure you want to delete this supplier with id ${id} ?`}
      triggerButton={
        <Button variant="link" className="p-0">
          <Trash className="size-5 text-red-500 hover:underline" />
        </Button>
      }
      confirmButton={
        <Button
          variant="destructive"
          type="button"
          isLoading={deleteSupplier.isPending}
          onClick={() => {
            deleteSupplier.mutate(id);
          }}
        >
          Delete Supplier
        </Button>
      }
    />
  );
};

export default SupplierDelete;
