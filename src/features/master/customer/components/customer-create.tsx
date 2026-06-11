import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';

import {
  useCreateCustomer,
  createCustomerInputSchema,
} from '../api/create-customer';

const CreateCustomer = () => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const createCustomer = useCreateCustomer({
    mutationConfig: {
      onSuccess: () => {
        navigate(-1);
        addNotification({
          type: 'success',
          title: 'Create Customer Succeeded!',
        });
      },
    },
  });

  return (
    <Form
      onSubmit={(values) => {
        console.log('value dari form create customer', values);
        createCustomer.mutate(values);
      }}
      schema={createCustomerInputSchema}
    >
      {({ register, formState }) => (
        <>
          <Input
            registration={register('CUSTOMER_CODE')}
            error={formState.errors['CUSTOMER_CODE']}
            type="text"
            label="Customer Code"
          />
          <Input
            registration={register('NAME')}
            error={formState.errors['NAME']}
            type="text"
            label="Customer Name"
          />
          <Input
            registration={register('TYPE')}
            error={formState.errors['TYPE']}
            type="text"
            label="Type"
          />
          <Input
            registration={register('ADDRESS')}
            error={formState.errors['ADDRESS']}
            type="text"
            label="Address"
          />
          <Input
            registration={register('PHONE')}
            error={formState.errors['PHONE']}
            type="text"
            label="Phone"
          />
          <Button disabled={createCustomer.isPending} type="submit">
            Add Customer
          </Button>
        </>
      )}
    </Form>
  );
};

export default CreateCustomer;
