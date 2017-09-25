export default {
  baseURL: 'http://localhost:8080/api',
  routes: {
    repairs: {
      path: '/repairs',
      activeTab: 1,
    },
    createRepair: {
      path: '/repairs/create',
      activeTab: 1,
    },
    editRepair: id => ({
      path: `/repairs/${id}/edit`,
      activeTab: 1,
    }),
    repairDetails: id => ({
      path: `/repairs/${id}`,
      activeTab: 1,
    }),
    users: {
      path: '/users',
      activeTab: 2,
    },
    login: {
      path: '/login',
    },
    register: {
      path: '/register',
    },
    accessDenied: {
      path: '/accessDenied',
    },
  },
};
