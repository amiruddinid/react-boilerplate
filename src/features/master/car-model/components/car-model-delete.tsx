import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';

import { useDeleteCarModel } from '../api/delete-car-model';

const CarModelDelete = ({ id }: { id: string }) => {
  const { addNotification } = useNotifications();
  const deleteCarModel = useDeleteCarModel({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'CarModel is deleted!',
        });
      },
    },
  });
  return (
    <ConfirmationDialog
      icon="danger"
      title="Delete CarModel"
      body={`Are you sure you want to delete 
                this car-model with id ${id} ?`}
      triggerButton={
        <Button variant="link" className="p-0">
          <Trash className="size-5 text-red-500 hover:underline" />
        </Button>
      }
      confirmButton={
        <Button
          variant="destructive"
          type="button"
          isLoading={deleteCarModel.isPending}
          onClick={() => {
            deleteCarModel.mutate(id);
          }}
        >
          Delete CarModel
        </Button>
      }
    />
  );
};

export default CarModelDelete;
