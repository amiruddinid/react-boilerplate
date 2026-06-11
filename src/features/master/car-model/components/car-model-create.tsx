import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';

import {
  useCreateCarModel,
  createCarModelInputSchema,
} from '../api/create-car-model';

const CreateCarModel = () => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const createCarModel = useCreateCarModel({
    mutationConfig: {
      onSuccess: () => {
        navigate(-1);
        addNotification({
          type: 'success',
          title: 'Create CarModel Succeeded!',
        });
      },
    },
  });

  return (
    <Form
      onSubmit={(values) => {
        console.log('value dari form create car-model', values);
        createCarModel.mutate(values);
      }}
      schema={createCarModelInputSchema}
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
          <Button disabled={createCarModel.isPending} type="submit">
            Add Car Model
          </Button>
        </>
      )}
    </Form>
  );
};

export default CreateCarModel;
