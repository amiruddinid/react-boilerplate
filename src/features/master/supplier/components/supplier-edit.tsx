import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input, Select } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';

import { useEditSupplier, editSupplierInputSchema } from '../api/edit-supplier';
import { useSupplierDetail } from '../api/get-supplier-detail';

const EditSupplier = ({ id }: { id: string }) => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const { data, isLoading, error } = useSupplierDetail({ id });
  const editSupplier = useEditSupplier({
    mutationConfig: {
      onSuccess: () => {
        navigate(-1);
        addNotification({
          type: 'success',
          title: 'Edit Supplier Succeeded!',
        });
      },
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>Error occurred while fetching supplier detail data.</div>;

  const supplier = data?.data;

  return (
    <Form
      onSubmit={(values) => {
        console.log('value dari form edit supplier', values);
        editSupplier.mutate({ id, data: values });
      }}
      options={{
        defaultValues: {
          SUPPLIER_CODE: supplier?.SUPPLIER_CODE ?? '',
          NAME: supplier?.NAME ?? '',
          CONTACT_PERSON: supplier?.CONTACT_PERSON ?? '',
          PHONE: supplier?.PHONE ?? '',
          ADDRESS: supplier?.ADDRESS ?? '',
          IS_ACTIVE: supplier?.IS_ACTIVE ? 'true' : 'false',
        } as any,
      }}
      schema={editSupplierInputSchema}
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
          <Button disabled={editSupplier.isPending} type="submit">
            Update Supplier
          </Button>
        </>
      )}
    </Form>
  );
};

export default EditSupplier;
