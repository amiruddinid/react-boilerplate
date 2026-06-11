import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input, Select } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';

import { useRole } from '../../role/api/get-role';
import { useEditUser, editUserInputSchema } from '../api/edit-user';
import { useUserDetail } from '../api/get-user-detail';

const EditUser = ({ id }: { id: string }) => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const {
    data: userDetailData,
    isLoading: userDetailLoading,
    error,
  } = useUserDetail({ id });
  const { data: rolesData, isLoading: rolesLoading } = useRole();
  const editUser = useEditUser({
    mutationConfig: {
      onSuccess: () => {
        navigate(-1);
        addNotification({
          type: 'success',
          title: 'Edit User Succeeded!',
        });
      },
    },
  });

  if (userDetailLoading || rolesLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching user detail data.</div>;

  const user = userDetailData?.data;

  const roleOptions = (rolesData?.data || []).map((role: any) => ({
    label: role.ROLE_NAME,
    value: String(role.ID),
  }));

  return (
    <Form
      onSubmit={(values) => {
        console.log('value dari form edit user', values);
        editUser.mutate({ id, data: values });
      }}
      options={{
        defaultValues: {
          PASSWORD: '',
          NOREG: user?.NOREG ?? '',
          EMAIL: user?.EMAIL ?? '',
          ROLE_ID: user?.ROLE_ID ?? '',
        } as any,
      }}
      schema={editUserInputSchema}
    >
      {({ register, formState }) => (
        <>
          <Input
            registration={register('PASSWORD')}
            error={formState.errors['PASSWORD']}
            type="password"
            label="New Password (leave blank to keep current)"
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
          <Button disabled={editUser.isPending} type="submit">
            Update User
          </Button>
        </>
      )}
    </Form>
  );
};

export default EditUser;
