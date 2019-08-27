/*
 *
 * GainsPropainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_GAINSSUBMITTING,
  CHANGE_GAINSRESULT,
  CHANGE_GAINSERROR,
  CHANGE_GAINS1,
  CHANGE_GAINS2,
  CHANGE_GAINS3,
  SUBMIT,
  PROCESS,
  ACTION1,
  ACTION2,
  ACTION3,
} from './constants';

export const initialState = fromJS({
  gainsSubmitting: false,
  gainsResult: null,
  gainsError: null,
  gains1: null,
  gains2: null,
  gains3: null,
});

function gainsPropainerReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_GAINSSUBMITTING:
      return state.set('gainsSubmitting', action.gainsSubmitting);
    case CHANGE_GAINSRESULT:
      return state.set('gainsResult', action.gainsResult).set('gainsSubmitting', false);
    case CHANGE_GAINSERROR:
      return state.set('gainsError', action.gainsError).set('gainsSubmitting', false);
    case CHANGE_GAINS1:
      return state.set('gains1', action.gains1);
    case CHANGE_GAINS2:
      return state.set('gains2', action.gains2);
    case CHANGE_GAINS3:
      return state.set('gains3', action.gains3);
    case SUBMIT:
      // alert('change this submit');
      return state.set('gainsSubmitting', true);
    case PROCESS:
      // alert('change this process');
      return state;
    case ACTION1:
      // alert('change this action1');
      return state;
    case ACTION2:
      // alert('change this action2');
      return state;
    case ACTION3:
      // alert('change this action3');
      return state;
    default:
      return state;
  }
}

export default gainsPropainerReducer;
