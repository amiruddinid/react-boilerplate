import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';

import { useCreateRole, createRoleInputSchema } from '../api/create-role';

const CreateRole = () => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const createRole = useCreateRole({
    mutationConfig: {
      onSuccess: () => {
        navigate(-1);
        addNotification({
          type: 'success',
          title: 'Create Role Succeeded!',
        });
      },
    },
  });

  return (
    <Form
      onSubmit={(values) => {
        console.log('value dari form create role', values);
        createRole.mutate(values);
      }}
      schema={createRoleInputSchema}
    >
      {({ register, formState }) => (
        <>
          <Input
            registration={register('ROLE_NAME')}
            error={formState.errors['ROLE_NAME']}
            type="text"
            label="Role Name"
          />
          <Button disabled={createRole.isPending} type="submit">
            Add Role
          </Button>
        </>
      )}
    </Form>
  );
};

export default CreateRole;
