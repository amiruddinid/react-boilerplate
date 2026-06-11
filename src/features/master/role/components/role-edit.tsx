import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';

import { useEditRole, editRoleInputSchema } from '../api/edit-role';
import { useRoleDetail } from '../api/get-role-detail';

const EditRole = ({ id }: { id: string }) => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const { data, isLoading, error } = useRoleDetail({ id });
  const editRole = useEditRole({
    mutationConfig: {
      onSuccess: () => {
        navigate(-1);
        addNotification({
          type: 'success',
          title: 'Edit Role Succeeded!',
        });
      },
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching role detail data.</div>;

  const role = data?.data;

  return (
    <Form
      onSubmit={(values) => {
        console.log('value dari form edit role', values);
        editRole.mutate({ id, data: values });
      }}
      options={{
        defaultValues: {
          ROLE_NAME: role?.ROLE_NAME ?? '',
        },
      }}
      schema={editRoleInputSchema}
    >
      {({ register, formState }) => (
        <>
          <Input
            registration={register('ROLE_NAME')}
            error={formState.errors['ROLE_NAME']}
            type="text"
            label="Role Name"
          />
          <Button disabled={editRole.isPending} type="submit">
            Update Role
          </Button>
        </>
      )}
    </Form>
  );
};

export default EditRole;
