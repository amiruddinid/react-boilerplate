import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input, Select } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';

import {
  useCreateSupplier,
  createSupplierInputSchema,
} from '../api/create-supplier';

const CreateSupplier = () => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const createSupplier = useCreateSupplier({
    mutationConfig: {
      onSuccess: () => {
        navigate(-1);
        addNotification({
          type: 'success',
          title: 'Create Supplier Succeeded!',
        });
      },
    },
  });

  return (
    <Form
      onSubmit={(values) => {
        console.log('value dari form create supplier', values);
        createSupplier.mutate(values);
      }}
      schema={createSupplierInputSchema}
    >
      {({ register, formState }) => (
        <>
          <Input
            registration={register('SUPPLIER_CODE')}
            error={formState.errors['SUPPLIER_CODE']}
            type="text"
            label="Supplier Code"
          />
          <Input
            registration={register('NAME')}
            error={formState.errors['NAME']}
            type="text"
            label="Supplier Name"
          />
          <Input
            registration={register('CONTACT_PERSON')}
            error={formState.errors['CONTACT_PERSON']}
            type="text"
            label="Contact Person"
          />
          <Input
            registration={register('PHONE')}
            error={formState.errors['PHONE']}
            type="text"
            label="Phone"
          />
          <Input
            registration={register('ADDRESS')}
            error={formState.errors['ADDRESS']}
            type="text"
            label="Address"
          />
          <Select
            label="Status"
            registration={register('IS_ACTIVE', {
              setValueAs: (value) => value === 'true',
            })}
            error={formState.errors['IS_ACTIVE']}
            options={[
              { label: 'Active', value: 'true' },
              { label: 'Inactive', value: 'false' },
            ]}
          />
          <Button disabled={createSupplier.isPending} type="submit">
            Add Supplier
          </Button>
        </>
      )}
    </Form>
  );
};

export default CreateSupplier;
