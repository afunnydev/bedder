/*
 *
 * LoginPage actions
 *
 */

import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_LOGIN_ERROR,
  USER_LOGIN_SUCCESS,
  CHANGE_PASSWORD,
  CHANGE_USERNAME,
  USER_LOGIN_VALIDATE,
} from './constants';

export function changeUsername(username) {
  return {
    type: CHANGE_USERNAME,
    username,
  };
}

export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}

export function userLogoutAction() {
  return {
    type: USER_LOGOUT,
  };
}

export function userLoginAction() {
  return {
    type: USER_LOGIN,
  };
}

export function userLoginValidateAction() {
  return {
    type: USER_LOGIN_VALIDATE,
  };
}

export function userLoginSuccessAction(result) {
  return {
    type: USER_LOGIN_SUCCESS,
    result,
  };
}

export function userLoginErrorAction(error) {
  return {
    type: USER_LOGIN_ERROR,
    error,
  };
}
