import { configureStore as configureRealStore } from '../store';
import UserInfo from '../../model/UserInfo';

it('UserInfo node initialized correctly', () => {
  const store = configureRealStore();
  expect(store.getState().auth).toEqual({
    error: null,
    status: '#none',
    userInfo: new UserInfo(null, null, null),
  });
});
