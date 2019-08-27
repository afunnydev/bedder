import { fromJS } from 'immutable';
import {
  CHANGE_RESULT,
  CHANGE_ERROR,
  CHANGE_SUBMITTING,
  CHANGE_DATA,
  SUBMIT,
} from './constants';

export const initialState = fromJS({
  result: null,
  error: null,
  submitting: true,
  data: null,
});

function myAdsPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_RESULT:
      return state.set('result', action.result).set('submitting', false);
    case CHANGE_ERROR:
      return state.set('error', action.error).set('submitting', false);
    case CHANGE_SUBMITTING:
      return state.set('submitting', action.submitting);
    case CHANGE_DATA:
      return state.set('data', action.data);
    case SUBMIT:
       return state.set('submitting', true);
    default:
      return state;
  }
}

export default myAdsPageReducer;
