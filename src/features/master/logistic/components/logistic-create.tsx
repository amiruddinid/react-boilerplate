import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';

import {
  useCreateLogistic,
  createLogisticInputSchema,
} from '../api/create-logistic';

const CreateLogistic = ({ onClose }: { onClose?: () => void }) => {
  const { addNotification } = useNotifications();
  const createLogistic = useCreateLogistic({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Create Logistic Succeeded!',
        });
        onClose?.();
      },
    },
  });

  return (
    <Form
      onSubmit={(values) => {
        console.log('value dari form create logistic', values);
        createLogistic.mutate(values);
      }}
      schema={createLogisticInputSchema}
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
            disabled={createLogistic.isPending}
            type="submit"
            className="mt-4"
          >
            Add Logistic
          </Button>
        </>
      )}
    </Form>
  );
};

export default CreateLogistic;
