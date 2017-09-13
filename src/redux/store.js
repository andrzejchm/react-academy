import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import reducers from './reducers';

export const history = createHistory();

export function configureStore() {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(applyMiddleware(routerMiddleware(history), thunk));
  const reducer = combineReducers({
    ...reducers,
    router: routerReducer,
  });
  return createStore(reducer, enhancer);
  /* eslint-enable */
}
