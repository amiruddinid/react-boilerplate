import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';

import {
  useCreateProduction,
  createProductionInputSchema,
} from '../api/create-production';

const CreateProduction = () => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const createProduction = useCreateProduction({
    mutationConfig: {
      onSuccess: () => {
        navigate(-1);
        addNotification({
          type: 'success',
          title: 'Create Production Succeeded!',
        });
      },
    },
  });

  return (
    <Form
      onSubmit={(values) => {
        console.log('value dari form create production', values);
        createProduction.mutate(values);
      }}
      schema={createProductionInputSchema}
    >
      {({ register, formState }) => (
        <>
          <Input
            registration={register('CAR_MODEL_ID')}
            error={formState.errors['CAR_MODEL_ID']}
            type="text"
            label="Car Model ID"
          />
          <Input
            registration={register('VIN')}
            error={formState.errors['VIN']}
            type="text"
            label="VIN"
          />
          <Input
            registration={register('ENGINE_NUMBER')}
            error={formState.errors['ENGINE_NUMBER']}
            type="text"
            label="Engine Number"
          />
          <Button disabled={createProduction.isPending} type="submit">
            Add Production
          </Button>
        </>
      )}
    </Form>
  );
};

export default CreateProduction;
