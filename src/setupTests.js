/* eslint-disable import/no-extraneous-dependencies */
import { initialState as userInfoInitialState } from './redux/reducers/userInfoReducer';
import { configureStore } from './redux/store';
/* eslint-enable */
const initialState = {
  userInfo: userInfoInitialState,
};

export default function configureTestStore() {
  return configureStore();
}
