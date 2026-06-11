import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';

import { useEditLogistic, editLogisticInputSchema } from '../api/edit-logistic';
import { useLogisticDetail } from '../api/get-logistic-detail';

const EditLogistic = ({
  id,
  onClose,
}: {
  id: string;
  onClose?: () => void;
}) => {
  const { addNotification } = useNotifications();
  const { data, isLoading, error } = useLogisticDetail({ id });
  const editLogistic = useEditLogistic({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Edit Logistic Succeeded!',
        });
        onClose?.();
      },
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>Error occurred while fetching logistic detail data.</div>;

  const logistic = data?.data;

  return (
    <Form
      onSubmit={(values) => {
        console.log('value dari form edit logistic', values);
        editLogistic.mutate({ id, data: values });
      }}
      options={{
        defaultValues: {
          VENDOR_CODE: logistic?.VENDOR_CODE ?? '',
          COMPANY_NAME: logistic?.COMPANY_NAME ?? '',
          FLEET_TYPE: logistic?.FLEET_TYPE ?? '',
          CONTACT_NUMBER: logistic?.CONTACT_NUMBER ?? '',
        },
      }}
      schema={editLogisticInputSchema}
    >
      {({ register, formState }) => (
        <>
          <Input
            registration={register('VENDOR_CODE')}
            error={formState.errors['VENDOR_CODE']}
            type="text"
            label="Vendor Code"
          />
          <Input
            registration={register('COMPANY_NAME')}
            error={formState.errors['COMPANY_NAME']}
            type="text"
            label="Company Name"
          />
          <Input
            registration={register('FLEET_TYPE')}
            error={formState.errors['FLEET_TYPE']}
            type="text"
            label="Fleet Type"
          />
          <Input
            registration={register('CONTACT_NUMBER')}
            error={formState.errors['CONTACT_NUMBER']}
            type="text"
            label="Contact Number"
          />
          <Button
            disabled={editLogistic.isPending}
            type="submit"
            className="mt-4"
          >
            Update Logistic
          </Button>
        </>
      )}
    </Form>
  );
};

export default EditLogistic;
