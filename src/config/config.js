export default {
  baseURL: 'http://localhost:8080/api',
  routes: {
    repairs: {
      path: '/repairs',
      activeTab: 1,
    },
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
  },
};
