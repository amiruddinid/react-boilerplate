import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';

import { useDeleteCustomer } from '../api/delete-customer';

const CustomerDelete = ({ id }: { id: string }) => {
  const { addNotification } = useNotifications();
  const deleteCustomer = useDeleteCustomer({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Customer is deleted!',
        });
      },
    },
  });
  return (
    <ConfirmationDialog
      icon="danger"
      title="Delete Customer"
      body={`Are you sure you want to delete this customer with id ${id} ?`}
      triggerButton={
        <Button variant="link" className="p-0">
          <Trash className="size-5 text-red-500 hover:underline" />
        </Button>
      }
      confirmButton={
        <Button
          variant="destructive"
          type="button"
          isLoading={deleteCustomer.isPending}
          onClick={() => {
            deleteCustomer.mutate(id);
          }}
        >
          Delete Customer
        </Button>
      }
    />
  );
};

export default CustomerDelete;
