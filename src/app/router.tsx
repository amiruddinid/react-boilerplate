import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import { paths } from '@/config/paths';
import { ProtectedRoute } from '@/lib/auth';

import {
  default as AppRoot,
  ErrorBoundary as AppRootErrorBoundary,
} from './routes/app/root';

const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: paths.home.path,
      lazy: () => import('./routes/landing').then(convert(queryClient)),
    },
    {
      path: paths.auth.register.path,
      lazy: () => import('./routes/auth/register').then(convert(queryClient)),
    },
    {
      path: '/auth/login',
      lazy: () => import('./routes/auth/login').then(convert(queryClient)),
    },
    {
      path: paths.app.root.path,
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      ErrorBoundary: AppRootErrorBoundary,
      children: [
        {
          path: paths.app.masterMaterial.path,
          lazy: () =>
            import('./routes/app/master/material/material').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterMaterialDetail.path,
          lazy: () =>
            import('./routes/app/master/material/material-detail').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterMaterialCreate.path,
          lazy: () =>
            import('./routes/app/master/material/create-material').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterMaterialEdit.path,
          lazy: () =>
            import('./routes/app/master/material/edit-material').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterCarModel.path,
          lazy: () =>
            import('./routes/app/master/car-model/car-model').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterCarModelDetail.path,
          lazy: () =>
            import('./routes/app/master/car-model/car-model-detail').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterCarModelCreate.path,
          lazy: () =>
            import('./routes/app/master/car-model/create-car-model').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterCarModelEdit.path,
          lazy: () =>
            import('./routes/app/master/car-model/edit-car-model').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterCustomer.path,
          lazy: () =>
            import('./routes/app/master/customer/customer').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterCustomerDetail.path,
          lazy: () =>
            import('./routes/app/master/customer/customer-detail').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterCustomerCreate.path,
          lazy: () =>
            import('./routes/app/master/customer/create-customer').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterCustomerEdit.path,
          lazy: () =>
            import('./routes/app/master/customer/edit-customer').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterSupplier.path,
          lazy: () =>
            import('./routes/app/master/supplier/supplier').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterSupplierDetail.path,
          lazy: () =>
            import('./routes/app/master/supplier/supplier-detail').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterSupplierCreate.path,
          lazy: () =>
            import('./routes/app/master/supplier/create-supplier').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterSupplierEdit.path,
          lazy: () =>
            import('./routes/app/master/supplier/edit-supplier').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterRole.path,
          lazy: () =>
            import('./routes/app/master/role/role').then(convert(queryClient)),
        },
        {
          path: paths.app.masterRoleDetail.path,
          lazy: () =>
            import('./routes/app/master/role/role-detail').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterRoleCreate.path,
          lazy: () =>
            import('./routes/app/master/role/create-role').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterRoleEdit.path,
          lazy: () =>
            import('./routes/app/master/role/edit-role').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterRolePermissions.path,
          lazy: () =>
            import('./routes/app/master/role-permissions/role-permissions').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterUser.path,
          lazy: () =>
            import('./routes/app/master/user/user').then(convert(queryClient)),
        },
        {
          path: paths.app.masterUserDetail.path,
          lazy: () =>
            import('./routes/app/master/user/user-detail').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterUserCreate.path,
          lazy: () =>
            import('./routes/app/master/user/create-user').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterUserEdit.path,
          lazy: () =>
            import('./routes/app/master/user/edit-user').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterLogistic.path,
          lazy: () =>
            import('./routes/app/master/logistic/logistic').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterBom.path,
          lazy: () =>
            import('./routes/app/master/bom/bom').then(convert(queryClient)),
        },
        {
          path: paths.app.masterBomDetail.path,
          lazy: () =>
            import('./routes/app/master/bom/bom-detail').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterBomCreate.path,
          lazy: () =>
            import('./routes/app/master/bom/create-bom').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterBomEdit.path,
          lazy: () =>
            import('./routes/app/master/bom/edit-bom').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.users.path,
          lazy: () => import('./routes/app/users').then(convert(queryClient)),
        },
        {
          path: paths.app.autoOrder.path,
          lazy: () =>
            import('./routes/app/auto-order').then(convert(queryClient)),
        },
        {
          path: paths.app.inventory.path,
          lazy: () =>
            import('./routes/app/inventory').then(convert(queryClient)),
        },
        {
          path: paths.app.profile.path,
          lazy: () => import('./routes/app/profile').then(convert(queryClient)),
        },
        {
          path: paths.app.dashboard.path,
          lazy: () =>
            import('./routes/app/dashboard').then(convert(queryClient)),
        },
      ],
    },
    {
      path: '*',
      lazy: () => import('./routes/not-found').then(convert(queryClient)),
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
