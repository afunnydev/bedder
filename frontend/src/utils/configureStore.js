import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { fromJS } from 'immutable';
import thunkMiddleware from 'redux-thunk';

import loggerMiddleware from './middlewares/logger';
import createRootReducerWith from './createRootReducerWith';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware, sagaMiddleware, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeWithDevTools(...enhancers);

  const rootReducer = createRootReducerWith();

  const store = createStore(rootReducer, fromJS(preloadedState), composedEnhancers);

  // Add a dictionary to keep track of the registered async reducers
  store.asyncReducers = {};

  // This will be used to run and inject sagas dynamically
  store.runSaga = sagaMiddleware.run;
  store.injectedSagas = {};

  // Create an inject reducer function
  // This function adds the async reducer, and creates a new combined reducer
  store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createRootReducerWith(store.asyncReducers));
  };

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./createRootReducerWith', () => store.replaceReducer(rootReducer));
  }

  return store;
}
