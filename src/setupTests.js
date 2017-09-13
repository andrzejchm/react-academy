import configureStore from 'redux-mock-store';
import { initialState as userInfoInitialState } from './redux/reducers/userInfoReducer';

const initialState = {
  userInfo: userInfoInitialState,
};

export default function configureTestStore() {
  const mockStore = configureStore();
  return mockStore(initialState);
}