import * as React from 'react';
import { Link, useSearchParams } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input, Select, Label, Switch } from '@/components/ui/form';
import { paths } from '@/config/paths';
import { useRegister, registerInputSchema } from '@/lib/auth';
import { Team } from '@/types/api';

type RegisterFormProps = {
  onSuccess: () => void;
  chooseTeam: boolean;
  setChooseTeam: () => void;
  teams?: Team[];
};

export const RegisterForm = ({
  onSuccess,
  chooseTeam,
  setChooseTeam,
  teams,
}: RegisterFormProps) => {
  const registering = useRegister({ onSuccess });
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <div>
      <Form
        onSubmit={(values) => {
          registering.mutate(values);
        }}
        schema={registerInputSchema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState }) => (
          <>
            <Input
              type="text"
              label="Username"
              error={formState.errors['USERNAME']}
              registration={register('USERNAME')}
            />
            <Input
              type="text"
              label="Noreg"
              error={formState.errors['NOREG']}
              registration={register('NOREG')}
            />
            <Input
              type="email"
              label="Email Address"
              error={formState.errors['EMAIL']}
              registration={register('EMAIL')}
            />
            <Input
              type="password"
              label="Password"
              error={formState.errors['PASSWORD']}
              registration={register('PASSWORD')}
            />

            <Select
              label="Role"
              error={formState.errors['ROLE_ID']}
              registration={register('ROLE_ID', { valueAsNumber: true })}
              options={[{
                label: 'Superadmin',
                value: 1,
              }, {
                label: 'Staff',
                value: 2,
              }]}
            />
            <div>
              <Button
                isLoading={registering.isPending}
                type="submit"
                className="w-full"
              >
                Register
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <Link
            to={paths.auth.login.getHref(redirectTo)}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};
