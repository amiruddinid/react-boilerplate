import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input, Select } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';

import { useCarModel } from '../../car-model/api/get-car-model';
import { useCreateBom, createBomInputSchema } from '../api/create-bom';

const CreateBom = () => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const { data: carModelsData, isLoading: carModelsLoading } = useCarModel();
  const createBom = useCreateBom({
    mutationConfig: {
      onSuccess: () => {
        navigate(-1);
        addNotification({
          type: 'success',
          title: 'Create BOM Succeeded!',
        });
      },
    },
  });

  if (carModelsLoading) return <div>Loading car models...</div>;

  const carModelOptions = (carModelsData?.data || []).map((model: any) => ({
    label: `${model.MODEL_NAME} (${model.MODEL_CODE})`,
    value: model.ID,
  }));

  return (
    <Form
      onSubmit={(values) => {
        console.log('value dari form create BOM', values);
        createBom.mutate(values);
      }}
      schema={createBomInputSchema}
    >
      {({ register, formState }) => (
        <>
          <Select
            label="Car Model"
            registration={register('CAR_MODEL_ID')}
            error={formState.errors['CAR_MODEL_ID']}
            options={[
              { label: '-- Select Car Model --', value: '' },
              ...carModelOptions,
            ]}
          />
          <Input
            registration={register('INVENTORY_ID')}
            error={formState.errors['INVENTORY_ID']}
            type="text"
            label="Inventory ID"
          />
          <Input
            registration={register('QTY_REQUIRED', {
              setValueAs: (value) => Number(value),
            })}
            error={formState.errors['QTY_REQUIRED']}
            type="number"
            label="Quantity Required"
          />
          <Button disabled={createBom.isPending} type="submit">
            Add BOM
          </Button>
        </>
      )}
    </Form>
  );
};

export default CreateBom;
