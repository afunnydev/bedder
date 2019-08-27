/*
 *
 * ForgotPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_USERNAME,
  CHANGE_CODE,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_REPEAT,
  SUBMIT_FORGOT,
  SUBMIT_FORGOT_RESULT,
  SUBMIT_FORGOT_ERROR,
  SUBMIT_CODE,
  SUBMIT_CODE_RESULT,
  SUBMIT_CODE_ERROR,
} from './constants';

export const initialState = fromJS({
  // username: 'wo.f.fkack@gmail.com',
  username: '',
  code: '',
  password: '',
  passwordRepeat: '',
  submitting: false,
  result: null,
  error: false,
  submittingCode: false,
  resultCode: null,
  errorCode: false,
  // validationError: false,
});

function forgotPageReducer(state = initialState, action) {
  // console.log('reducer', action)
  // console.log('forgotPageReducer', action);
  switch (action.type) {
    case CHANGE_CODE:
      return state.set('code', action.code);
    case CHANGE_USERNAME:
      return state.set('username', action.username);
    case CHANGE_PASSWORD:
      return state.set('password', action.password);
    case CHANGE_PASSWORD_REPEAT:
      return state.set('passwordRepeat', action.passwordRepeat);
    case SUBMIT_CODE:
      return state.set('submitting', true);
    case SUBMIT_CODE_RESULT:
      return state
        .set('submitting', false)
        .set('resultCode', action.result)
        .set('errorCode', false);
    case SUBMIT_CODE_ERROR:
      return state
        .set('submitting', false)
        .set('errorCode', action.error)
        .set('resultCode', null);
    case SUBMIT_FORGOT:
      return state.set('submitting', true);
    case SUBMIT_FORGOT_RESULT:
      return state
        .set('submitting', false)
        .set('result', action.result)
        .set('error', false);
    case SUBMIT_FORGOT_ERROR:
      return state
        .set('submitting', false)
        .set('error', action.error)
        .set('result', null);
    default:
      return state;
  }
}

export default forgotPageReducer;
