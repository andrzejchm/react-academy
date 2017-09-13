import * as actions from './userInfoActions';
import configureStore from '../__tests__/store.test';


it('should create an action to add a todo', () => {
  const mockStore = configureStore();
  const credentials = { username: 'username', password: 'password' };
  expect(typeof actions.login(credentials)).toBe('function');
});
