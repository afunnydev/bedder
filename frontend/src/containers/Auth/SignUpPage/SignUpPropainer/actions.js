/*
 *
 * SignUpPropainer actions
 *
 */

import {
  CHANGE_FACEBOOKSUBMITTING,
  CHANGE_FACEBOOKRESULT,
  CHANGE_FACEBOOKERROR,
  CHANGE_FACEBOOKOAUTHRESULT,
  SUBMITFACEBOOK,
  SUCCESSFACEBOOK,
} from './constants';

export function changeFacebookSubmittingAction(facebookSubmitting) {
  return {
    type: CHANGE_FACEBOOKSUBMITTING,
    facebookSubmitting,
  };
}
export function changeFacebookResultAction(facebookResult) {
  return {
    type: CHANGE_FACEBOOKRESULT,
    facebookResult,
  };
}
export function changeFacebookErrorAction(facebookError) {
  return {
    type: CHANGE_FACEBOOKERROR,
    facebookError,
  };
}
export function changeFacebookOauthResultAction(facebookOauthResult) {
  return {
    type: CHANGE_FACEBOOKOAUTHRESULT,
    facebookOauthResult,
  };
}
export function submitFacebookAction(submitFacebook) {
  return {
    type: SUBMITFACEBOOK,
    submitFacebook,
  };
}
export function successFacebookAction(successFacebook) {
  return {
    type: SUCCESSFACEBOOK,
    successFacebook,
  };
}
