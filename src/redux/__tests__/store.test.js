import configureStore from 'redux-mock-store';
import { initialState as userInfoInitialState } from '../reducers/userInfoReducer';
import { configureStore as configureRealStore } from '../store';
import UserInfo from '../../data/UserInfo';

const initialState = {
  userInfo: userInfoInitialState,
};

export default function configureTestStore() {
  const mockStore = configureStore();
  return mockStore(initialState);
}

it('builds test store correctly', () => {
  configureStore();
});

it('UserInfo node initialized correctly', () => {
  const store = configureRealStore();
  expect(store.getState().userInfo).toEqual({
    error: null,
    status: 'none',
    userInfo: new UserInfo(null, null, null),
  });
});
