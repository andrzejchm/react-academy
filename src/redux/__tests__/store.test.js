import { configureStore as configureRealStore } from '../store';
import UserInfo from '../../data/UserInfo';

it('UserInfo node initialized correctly', () => {
  const store = configureRealStore();
  expect(store.getState().userInfo).toEqual({
    error: null,
    status: 'none',
    userInfo: new UserInfo(null, null, null),
  });
});
