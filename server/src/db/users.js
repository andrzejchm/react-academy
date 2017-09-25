const users = {
  andrzejchm: { password: 'abc', token: 'def', role: 'admin' },
  user: { password: 'user', token: 'user', role: 'user' },
  manager: { password: 'manager', token: 'user', role: 'manager' },
};

const guid = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
};

const dao = {
  credentialsMatch(credentials) {
    const user = users[credentials.username];
    return (user && user.password === credentials.password);
  },

  getWholeUserRow(username) {
    return users[username];
  },

  getUserBasic(username) {
    const user = this.getWholeUserRow(username);
    if (user) {
      return { username, role: user.role };
    }
    return null;
  },

  getUsersListBasic() {
    return Object.keys(users).map(key => dao.getUserBasic(key));
  },

  userWithToken(token) {
    const userItem = Object.keys(users)
      .map(key => ({ username: key, user: users[key] }))
      .find(elem => elem.user.token === token);
    if (userItem) {
      return { ...userItem.user, username: userItem.username };
    }
    return null;
  },

  addUser(user) {
    users[user.username] = {
      password: user.password,
      token: guid(),
      role: 'user',
    };
  },

  removeUser(username) {
    delete users[username];
  },

  getUsersContainingUsername(searchPhrase) {
    return Object.keys(users)
      .filter(username => username.toLowerCase().indexOf(searchPhrase.toLowerCase()) !== -1)
      .map(username => dao.getUserBasic(username));
  },
};

export default dao;
