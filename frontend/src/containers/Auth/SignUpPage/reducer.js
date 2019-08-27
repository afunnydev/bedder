/*
 *
 * SignUpPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_EMAIL,
  CHANGE_CODE,
  USER_ACTIVATE,
  USER_ACTIVATE_ERROR,
  USER_ACTIVATE_SUCCESS,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_REPEAT,
  USER_SIGNUP,
  USER_SIGNUP_ERROR,
  USER_SIGNUP_SUCCESS,
  CHANGE_FIRSTNAME,
  CHANGE_LASTNAME,
} from './constants';

export const initialState = fromJS({
  email: '',
  firstname: '',
  lastname: '',
  password: '',
  passwordRepeat: '',
  code: '',
  submitting: false,
  result: null,
  error: false,
  submittingCode: false,
  resultCode: null,
  errorCode: false,
});

function signUpPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_EMAIL:
      return state.set('email', action.email);
    case CHANGE_CODE:
      return state.set('code', action.code);
    case CHANGE_FIRSTNAME:
      return state.set('firstname', action.firstname);
    case CHANGE_LASTNAME:
      return state.set('lastname', action.lastname);
    case CHANGE_PASSWORD:
      return state.set('password', action.password);
    case CHANGE_PASSWORD_REPEAT:
      return state.set('passwordRepeat', action.passwordRepeat);
    case USER_SIGNUP:
      return state.set('submitting', true);
    case USER_SIGNUP_ERROR:
      return state
        .set('submitting', false)
        .set('error', action.error)
        .set('result', null);
    case USER_SIGNUP_SUCCESS:
      return state
        .set('submitting', false)
        .set('result', action.result)
        .set('error', false);
    case USER_ACTIVATE:
      return state.set('submittingCode', true);
    case USER_ACTIVATE_ERROR:
      return state
        .set('submittingCode', false)
        .set('errorCode', action.error)
        .set('resultCode', null);
    case USER_ACTIVATE_SUCCESS:
      return state
        .set('submittingCode', false)
        .set('resultCode', action.result)
        .set('errorCode', false);
    default:
      return state;
  }
}

export default signUpPageReducer;
