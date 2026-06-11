import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';

import { useEditMaterial, editMaterialInputSchema } from '../api/edit-material';
import { useMaterialDetail } from '../api/get-material-detail';

const EditMaterial = ({ id }: { id: string }) => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const { data, isLoading, error } = useMaterialDetail({ id });
  const editMaterial = useEditMaterial({
    mutationConfig: {
      onSuccess: () => {
        navigate(-1);
        addNotification({
          type: 'success',
          title: 'Edit Material Succeeded!',
        });
      },
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>Error occurred while fetching material detail data.</div>;

  const material = data?.data;

  return (
    <Form
      onSubmit={(values) => {
        console.log('value dari form edit material', values);
        editMaterial.mutate({ id, data: values });
      }}
      options={{
        defaultValues: {
          NAME: material?.NAME ?? '',
          PART_NUMBER: material?.PART_NUMBER ?? '',
          UNIT: material?.UNIT ?? '',
          CATEGORY: material?.CATEGORY ?? '',
          SUPPLIER_ID: material.SUPPLIER_ID ?? '',
        },
      }}
      schema={editMaterialInputSchema}
    >
      {({ register, formState }) => (
        <>
          <Input
            registration={register('NAME')}
            error={formState.errors['NAME']}
            type="text"
            label="Material Name"
          />
          <Input
            registration={register('PART_NUMBER')}
            error={formState.errors['PART_NUMBER']}
            type="text"
            label="Part Number"
          />
          <Input
            registration={register('UNIT')}
            error={formState.errors['UNIT']}
            type="text"
            label="Unit"
          />
          <Input
            registration={register('CATEGORY')}
            error={formState.errors['CATEGORY']}
            type="text"
            label="Category"
          />
          <Input
            registration={register('SUPPLIER_ID')}
            error={formState.errors['SUPPLIER_ID']}
            type="text"
            label="Supplier ID"
          />
          <Button disabled={editMaterial.isPending} type="submit">
            Update Material
          </Button>
        </>
      )}
    </Form>
  );
};

export default EditMaterial;
