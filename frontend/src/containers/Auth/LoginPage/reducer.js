/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  USER_LOGOUT,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  CHANGE_PASSWORD,
  CHANGE_USERNAME,
} from './constants';

export const initialState = fromJS({
  username: '',
  password: '',
  submitting: false,
  result: null,
  error: null,
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_PASSWORD:
      return state.set('password', action.password);
    case CHANGE_USERNAME:
      return state.set('username', action.username);
    case USER_LOGIN:
      return state.set('submitting', true);
    case USER_LOGIN_SUCCESS:
      return state
        .set('submitting', false)
        .set('result', action.result)
        .set('error', false);
    case USER_LOGIN_ERROR:
      return state
        .set('submitting', false)
        .set('error', action.error)
        .set('result', null);
    case USER_LOGOUT:
      return state
        .set('password', '')
        .set('username', '')
        .set('error', false)
        .set('result', null)
        .set('submitting', false);
    default:
      return state;
  }
}

export default loginPageReducer;
