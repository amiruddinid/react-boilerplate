import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input, Select } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';

import { useCarModel } from '../../car-model/api/get-car-model';
import { useEditBom, editBomInputSchema } from '../api/edit-bom';
import { useBomDetail } from '../api/get-bom-detail';

const EditBom = ({ id }: { id: string }) => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const {
    data: bomDetailData,
    isLoading: bomDetailLoading,
    error,
  } = useBomDetail({ id });
  const { data: carModelsData, isLoading: carModelsLoading } = useCarModel();
  const editBom = useEditBom({
    mutationConfig: {
      onSuccess: () => {
        navigate(-1);
        addNotification({
          type: 'success',
          title: 'Edit BOM Succeeded!',
        });
      },
    },
  });

  if (bomDetailLoading || carModelsLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching BOM detail data.</div>;

  const bom = bomDetailData?.data;

  const carModelOptions = (carModelsData?.data || []).map((model: any) => ({
    label: `${model.MODEL_NAME} (${model.MODEL_CODE})`,
    value: model.ID,
  }));

  return (
    <Form
      onSubmit={(values) => {
        console.log('value dari form edit BOM', values);
        editBom.mutate({ id, data: values });
      }}
      options={{
        defaultValues: {
          CAR_MODEL_ID: bom?.CAR_MODEL_ID ?? '',
          INVENTORY_ID: bom?.INVENTORY_ID ?? '',
          QTY_REQUIRED: bom?.QTY_REQUIRED ?? 0,
        },
      }}
      schema={editBomInputSchema}
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
          <Button disabled={editBom.isPending} type="submit">
            Update BOM
          </Button>
        </>
      )}
    </Form>
  );
};

export default EditBom;
