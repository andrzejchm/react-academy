import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import reducers from './reducers';

export const history = createHistory();

export function configureStore(callback) {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */
  const enhancer = composeEnhancers(applyMiddleware(routerMiddleware(history),
    thunk), autoRehydrate());
  const reducer = combineReducers({
    ...reducers,
    router: routerReducer,
  });
  const store = createStore(reducer, undefined, enhancer);
  persistStore(store, {
    whitelist: ['auth'],
  }, () => {
    if (callback) {
      callback(store);
    }
  });
  return store;
}
