/* eslint-disable import/no-extraneous-dependencies */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState as userInfoInitialState } from './redux/reducers/userInfoReducer';
/* eslint-enable */
const initialState = {
  userInfo: userInfoInitialState,
};

export default function configureTestStore() {
  const mockStore = configureStore([thunk]);
  return mockStore(initialState);
}
