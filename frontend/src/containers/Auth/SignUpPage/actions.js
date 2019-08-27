/*
 *
 * SignUpPage actions
 *
 */

import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_REPEAT,
  USER_SIGNUP,
  USER_SIGNUP_ERROR,
  USER_SIGNUP_SUCCESS,
  CHANGE_FIRSTNAME,
  CHANGE_LASTNAME,
  CHANGE_CODE,
  USER_ACTIVATE,
  USER_ACTIVATE_ERROR,
  USER_ACTIVATE_SUCCESS,
} from './constants';

export function changeCodeAction(code) {
  return {
    type: CHANGE_CODE,
    code,
  };
}

export function changeEmailAction(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}

export function changeFirstnameAction(firstname) {
  return {
    type: CHANGE_FIRSTNAME,
    firstname,
  };
}

export function changeLastnameAction(lastname) {
  return {
    type: CHANGE_LASTNAME,
    lastname,
  };
}

export function changePasswordAction(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}

export function changePasswordRepeatAction(passwordRepeat) {
  return {
    type: CHANGE_PASSWORD_REPEAT,
    passwordRepeat,
  };
}

export function userSignupAction() {
  return {
    type: USER_SIGNUP,
  };
}

export function userSignupSuccessAction(result) {
  return {
    type: USER_SIGNUP_SUCCESS,
    result,
  };
}

export function userSignupErrorAction(error) {
  return {
    type: USER_SIGNUP_ERROR,
    error,
  };
}

export function userActivateAction() {
  return {
    type: USER_ACTIVATE,
  };
}

export function userActivateSuccessAction(result) {
  return {
    type: USER_ACTIVATE_SUCCESS,
    result,
  };
}

export function userActivateErrorAction(error) {
  return {
    type: USER_ACTIVATE_ERROR,
    error,
  };
}
