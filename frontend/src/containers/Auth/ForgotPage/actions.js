/*
 *
 * ForgotPage actions
 *
 */

import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_REPEAT,
  CHANGE_USERNAME,
  CHANGE_CODE,
  SUBMIT_FORGOT,
  SUBMIT_FORGOT_RESULT,
  SUBMIT_FORGOT_ERROR,
  SUBMIT_CODE,
  SUBMIT_CODE_RESULT,
  SUBMIT_CODE_ERROR,
} from './constants';

export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}

export function changePasswordRepeat(passwordRepeat) {
  return {
    type: CHANGE_PASSWORD_REPEAT,
    passwordRepeat,
  };
}

export function changeUsername(username) {
  return {
    type: CHANGE_USERNAME,
    username,
  };
}

export function changeCode(code) {
  return {
    type: CHANGE_CODE,
    code,
  };
}

export function submitForgotAction() {
  return {
    type: SUBMIT_FORGOT,
  };
}

export function submitForgotResultAction(result) {
  return {
    type: SUBMIT_FORGOT_RESULT,
    result,
  };
}

export function submitForgotErrorAction(error) {
  return {
    type: SUBMIT_FORGOT_ERROR,
    error,
  };
}

export function submitCodeAction() {
  return {
    type: SUBMIT_CODE,
  };
}

export function submitCodeResultAction(result) {
  return {
    type: SUBMIT_CODE_RESULT,
    result,
  };
}

export function submitCodeErrorAction(error) {
  return {
    type: SUBMIT_CODE_ERROR,
    error,
  };
}
