const users = {
  andrzejchm: { password: 'abc', token: 'def', role: 'manager' },
  user: { password: 'user', token: 'user', role: 'user' },
};

const guid = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
};

export default {
  credentialsMatch(credentials) {
    const user = users[credentials.username];
    return (user && user.password === credentials.password);
  },

  getWholeUserRow(username) {
    return users[username];
  },

  getUserBasic(username) {
    const user = this.getWholeUserRow(username);
    return { username, role: user.role };
  },

  userWithToken(token) {
    return Object.keys(users).map(key => users[key]).find(elem => elem.token === token);
  },

  addUser(user) {
    users[user.username] = {
      password: user.password,
      token: guid(),
      role: 'user',
    };
  },
};
