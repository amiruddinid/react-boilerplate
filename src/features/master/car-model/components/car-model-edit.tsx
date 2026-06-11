import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';

import {
  useEditCarModel,
  editCarModelInputSchema,
} from '../api/edit-car-model';
import { useCarModelDetail } from '../api/get-car-model-detail';

const EditCarModel = ({ id }: { id: string }) => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const { data, isLoading, error } = useCarModelDetail({ id });
  const editCarModel = useEditCarModel({
    mutationConfig: {
      onSuccess: () => {
        navigate(-1);
        addNotification({
          type: 'success',
          title: 'Edit CarModel Succeeded!',
        });
      },
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>Error occurred while fetching car-model detail data.</div>;

  const carmodel = data?.data;

  return (
    <Form
      onSubmit={(values) => {
        console.log('value dari form edit car-model', values);
        editCarModel.mutate({ id, data: values });
      }}
      options={{
        defaultValues: {
          MODEL_NAME: carmodel?.MODEL_NAME ?? '',
          MODEL_CODE: carmodel?.MODEL_CODE ?? '',
          COLOR: carmodel?.COLOR ?? '',
          TRANSMISSION_TYPE: carmodel?.TRANSMISSION_TYPE ?? '',
        },
      }}
      schema={editCarModelInputSchema}
    >
      {({ register, formState }) => (
        <>
          <Input
            registration={register('MODEL_NAME')}
            error={formState.errors['MODEL_NAME']}
            type="text"
            label="Model Name"
          />
          <Input
            registration={register('MODEL_CODE')}
            error={formState.errors['MODEL_CODE']}
            type="text"
            label="Model Code"
          />
          <Input
            registration={register('COLOR')}
            error={formState.errors['COLOR']}
            type="text"
            label="Color"
          />
          <Input
            registration={register('TRANSMISSION_TYPE')}
            error={formState.errors['TRANSMISSION_TYPE']}
            type="text"
            label="Transmission Type"
          />
          <Button disabled={editCarModel.isPending} type="submit">
            Edit Car Model
          </Button>
        </>
      )}
    </Form>
  );
};

export default EditCarModel;
