import { Button } from '@/components/ui/button';
import { Form, Input, Select } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';

import { useRole } from '../../role/api/get-role';
import {
  useCreateRolePermissions,
  createRolePermissionsInputSchema,
} from '../api/create-role-permissions';

const CreateRolePermissions = ({ onClose }: { onClose?: () => void }) => {
  const { addNotification } = useNotifications();
  const { data: rolesData, isLoading: rolesLoading } = useRole();
  const createRolePermissions = useCreateRolePermissions({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Create Role Permission Succeeded!',
        });
        onClose?.();
      },
    },
  });

  if (rolesLoading) return <div>Loading roles...</div>;

  const roleOptions = (rolesData?.data || []).map((role: any) => ({
    label: role.ROLE_NAME,
    value: String(role.ID),
  }));

  // Add a default placeholder option at the beginning
  const finalRoleOptions = [
    { label: '-- Select Role --', value: '' },
    ...roleOptions,
  ];

  return (
    <Form
      onSubmit={(values) => {
        console.log('value dari form create role permissions', values);
        createRolePermissions.mutate(values);
      }}
      schema={createRolePermissionsInputSchema}
    >
      {({ register, formState }) => (
        <>
          <Select
            label="Role"
            registration={register('ROLE_ID', {
              setValueAs: (value) => Number(value),
            })}
            error={formState.errors['ROLE_ID']}
            options={finalRoleOptions}
          />
          <Input
            registration={register('FUNCTION')}
            error={formState.errors['FUNCTION']}
            type="text"
            label="Function"
          />
          <Input
            registration={register('FEATURE')}
            error={formState.errors['FEATURE']}
            type="text"
            label="Feature"
          />
          <Button
            disabled={createRolePermissions.isPending}
            type="submit"
            className="mt-4"
          >
            Add Role Permission
          </Button>
        </>
      )}
    </Form>
  );
};

export default CreateRolePermissions;
