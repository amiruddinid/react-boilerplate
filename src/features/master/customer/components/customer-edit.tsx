import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';

import { useEditCustomer, editCustomerInputSchema } from '../api/edit-customer';
import { useCustomerDetail } from '../api/get-customer-detail';

const EditCustomer = ({ id }: { id: string }) => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const { data, isLoading, error } = useCustomerDetail({ id });
  const editCustomer = useEditCustomer({
    mutationConfig: {
      onSuccess: () => {
        navigate(-1);
        addNotification({
          type: 'success',
          title: 'Edit Customer Succeeded!',
        });
      },
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>Error occurred while fetching customer detail data.</div>;

  const customer = data?.data;

  return (
    <Form
      onSubmit={(values) => {
        console.log('value dari form edit customer', values);
        editCustomer.mutate({ id, data: values });
      }}
      options={{
        defaultValues: {
          CUSTOMER_CODE: customer?.CUSTOMER_CODE ?? '',
          NAME: customer?.NAME ?? '',
          TYPE: customer?.TYPE ?? '',
          ADDRESS: customer?.ADDRESS ?? '',
          PHONE: customer?.PHONE ?? '',
        },
      }}
      schema={editCustomerInputSchema}
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
          <Button disabled={editCustomer.isPending} type="submit">
            Update Customer
          </Button>
        </>
      )}
    </Form>
  );
};

export default EditCustomer;
