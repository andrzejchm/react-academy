import * as actions from '../authDuck';


it('should create an action to add a todo', () => {
  const credentials = { username: 'username', password: 'password' };
  expect(typeof actions.login(credentials)).toBe('function');
});
