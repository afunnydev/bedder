import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form';
import globalReducer from 'containers/App/reducer';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createRootReducerWith(injectedReducers) {
  return combineReducers({
    global: globalReducer,
    form: formReducer,
    ...injectedReducers,
  });
}
