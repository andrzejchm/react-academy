import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import reducers from './reducers';

export const history = createHistory();

export function configureStore() {
  return createStore(combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  applyMiddleware(routerMiddleware(history)));
}
