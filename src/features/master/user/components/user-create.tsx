import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input, Select } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';

import { useRole } from '../../role/api/get-role';
import { useCreateUser, createUserInputSchema } from '../api/create-user';

const CreateUser = () => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const { data: rolesData, isLoading: rolesLoading } = useRole();
  const createUser = useCreateUser({
    mutationConfig: {
      onSuccess: () => {
        navigate(-1);
        addNotification({
          type: 'success',
          title: 'Create User Succeeded!',
        });
      },
    },
  });

  if (rolesLoading) return <div>Loading roles...</div>;

  const roleOptions = (rolesData?.data || []).map((role: any) => ({
    label: role.ROLE_NAME,
    value: String(role.ID),
  }));

  return (
    <Form
      onSubmit={(values) => {
        console.log('value dari form create user', values);
        createUser.mutate(values);
      }}
      schema={createUserInputSchema}
    >
      {({ register, formState }) => (
        <>
          <Input
            registration={register('USERNAME')}
            error={formState.errors['USERNAME']}
            type="text"
            label="Username"
          />
          <Input
            registration={register('PASSWORD')}
            error={formState.errors['PASSWORD']}
            type="password"
            label="Password"
          />
          <Input
            registration={register('NOREG')}
            error={formState.errors['NOREG']}
            type="text"
            label="Noreg"
          />
          <Input
            registration={register('EMAIL')}
            error={formState.errors['EMAIL']}
            type="email"
            label="Email"
          />
          <Select
            label="Role"
            registration={register('ROLE_ID', {
              setValueAs: (value) => Number(value),
            })}
            error={formState.errors['ROLE_ID']}
            options={[
              { label: '-- Select Role --', value: '' },
              ...roleOptions,
            ]}
          />
          <Button disabled={createUser.isPending} type="submit">
            Add User
          </Button>
        </>
      )}
    </Form>
  );
};

export default CreateUser;
