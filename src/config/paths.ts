export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },

  auth: {
    register: {
      path: '/auth/register',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    login: {
      path: '/auth/login',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },

  app: {
    root: {
      path: '/app',
      getHref: () => '/app',
    },
    dashboard: {
      path: '',
      getHref: () => '/app',
    },
    masterMaterial: {
      path: 'master/material',
      getHref: () => '/app/master/material',
    },
    masterMaterialDetail: {
      path: 'master/material/:id',
      getHref: (id: string) => `/app/master/material/${id}`,
    },
    masterMaterialCreate: {
      path: 'master/material/create',
      getHref: () => '/app/master/material/create',
    },
    masterMaterialEdit: {
      path: 'master/material/:id/edit',
      getHref: (id: string) => `/app/master/material/${id}/edit`,
    },
    masterCarModel: {
      path: 'master/car-model',
      getHref: () => '/app/master/car-model',
    },
    masterCarModelDetail: {
      path: 'master/car-model/:id',
      getHref: (id: string) => `/app/master/car-model/${id}`,
    },
    masterCarModelCreate: {
      path: 'master/car-model/create',
      getHref: () => '/app/master/car-model/create',
    },
    masterCarModelEdit: {
      path: 'master/car-model/:id/edit',
      getHref: (id: string) => `/app/master/car-model/${id}/edit`,
    },
    masterCustomer: {
      path: 'master/customer',
      getHref: () => '/app/master/customer',
    },
    masterCustomerDetail: {
      path: 'master/customer/:id',
      getHref: (id: string) => `/app/master/customer/${id}`,
    },
    masterCustomerCreate: {
      path: 'master/customer/create',
      getHref: () => '/app/master/customer/create',
    },
    masterCustomerEdit: {
      path: 'master/customer/:id/edit',
      getHref: (id: string) => `/app/master/customer/${id}/edit`,
    },
    masterSupplier: {
      path: 'master/supplier',
      getHref: () => '/app/master/supplier',
    },
    masterSupplierDetail: {
      path: 'master/supplier/:id',
      getHref: (id: string) => `/app/master/supplier/${id}`,
    },
    masterSupplierCreate: {
      path: 'master/supplier/create',
      getHref: () => '/app/master/supplier/create',
    },
    masterSupplierEdit: {
      path: 'master/supplier/:id/edit',
      getHref: (id: string) => `/app/master/supplier/${id}/edit`,
    },
    masterRole: {
      path: 'master/role',
      getHref: () => '/app/master/role',
    },
    masterRoleDetail: {
      path: 'master/role/:id',
      getHref: (id: string) => `/app/master/role/${id}`,
    },
    masterRoleCreate: {
      path: 'master/role/create',
      getHref: () => '/app/master/role/create',
    },
    masterRoleEdit: {
      path: 'master/role/:id/edit',
      getHref: (id: string) => `/app/master/role/${id}/edit`,
    },
    masterRolePermissions: {
      path: 'master/role-permissions',
      getHref: () => '/app/master/role-permissions',
    },
    masterRolePermissionsDetail: {
      path: 'master/role-permissions/:id',
      getHref: (id: string) => `/app/master/role-permissions/${id}`,
    },
    masterRolePermissionsCreate: {
      path: 'master/role-permissions/create',
      getHref: () => '/app/master/role-permissions/create',
    },
    masterRolePermissionsEdit: {
      path: 'master/role-permissions/:id/edit',
      getHref: (id: string) => `/app/master/role-permissions/${id}/edit`,
    },
    masterUser: {
      path: 'master/user',
      getHref: () => '/app/master/user',
    },
    masterUserDetail: {
      path: 'master/user/:id',
      getHref: (id: string) => `/app/master/user/${id}`,
    },
    masterUserCreate: {
      path: 'master/user/create',
      getHref: () => '/app/master/user/create',
    },
    masterUserEdit: {
      path: 'master/user/:id/edit',
      getHref: (id: string) => `/app/master/user/${id}/edit`,
    },
    masterLogistic: {
      path: 'master/logistic',
      getHref: () => '/app/master/logistic',
    },
    masterLogisticDetail: {
      path: 'master/logistic/:id',
      getHref: (id: string) => `/app/master/logistic/${id}`,
    },
    masterLogisticCreate: {
      path: 'master/logistic/create',
      getHref: () => '/app/master/logistic/create',
    },
    masterLogisticEdit: {
      path: 'master/logistic/:id/edit',
      getHref: (id: string) => `/app/master/logistic/${id}/edit`,
    },
    masterBom: {
      path: 'master/bom',
      getHref: () => '/app/master/bom',
    },
    masterBomDetail: {
      path: 'master/bom/:id',
      getHref: (id: string) => `/app/master/bom/${id}`,
    },
    masterBomCreate: {
      path: 'master/bom/create',
      getHref: () => '/app/master/bom/create',
    },
    masterBomEdit: {
      path: 'master/bom/:id/edit',
      getHref: (id: string) => `/app/master/bom/${id}/edit`,
    },
    users: {
      path: 'users',
      getHref: () => '/app/users',
    },
    profile: {
      path: 'profile',
      getHref: () => '/app/profile',
    },
    discussion: {
      path: 'discussions/:discussionId',
      getHref: (id: string) => `/app/discussions/${id}`,
    },
    discussions: {
      path: 'discussions',
      getHref: () => '/app/discussions',
    },
  },
} as const;
