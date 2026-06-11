import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';

import {
  useCreateMaterial,
  createMaterialInputSchema,
} from '../api/create-material';

const CreateMaterial = () => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const createMaterial = useCreateMaterial({
    mutationConfig: {
      onSuccess: () => {
        navigate(-1);
        addNotification({
          type: 'success',
          title: 'Create Material Succeeded!',
        });
      },
    },
  });

  return (
    <Form
      onSubmit={(values) => {
        console.log('value dari form create material', values);
        createMaterial.mutate(values);
      }}
      schema={createMaterialInputSchema}
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
          <Button disabled={createMaterial.isPending} type="submit">
            Add Material
          </Button>
        </>
      )}
    </Form>
  );
};

export default CreateMaterial;
