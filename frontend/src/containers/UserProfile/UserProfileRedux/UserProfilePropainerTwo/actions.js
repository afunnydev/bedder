/*
 *
 * UserProfilePropainerTwo actions
 *
 */

import {
  CHANGE_OLDPASSWORD,
  CHANGE_NEWPASSWORD,
  CHANGE_NEWPASSWORDREPEAT,
  CHANGE_ISPASSWORDCHANGE,
  CHANGE_SUBMITSAVE,
  CHANGE_SUBMITSAVERESULT,
  CHANGE_SUBMITSAVEERROR,
  CHANGE_SUBMITSAVESUBMITTING,
  CHANGE_VALIDATIONDATA,
  SUBMITSAVE,
  PROCESSSAVE,
  DOCHANGEPASSWORD,
  DOVALIDATEPASSWORD,
  VALIDATE,
} from './constants';

export function changeOldPasswordAction(oldPassword) {
  return {
    type: CHANGE_OLDPASSWORD,
    oldPassword,
  };
}
export function changeNewPasswordAction(newPassword) {
  return {
    type: CHANGE_NEWPASSWORD,
    newPassword,
  };
}
export function changeNewPasswordRepeatAction(newPasswordRepeat) {
  return {
    type: CHANGE_NEWPASSWORDREPEAT,
    newPasswordRepeat,
  };
}
export function changeIsPasswordChangeAction(isPasswordChange) {
  return {
    type: CHANGE_ISPASSWORDCHANGE,
    isPasswordChange,
  };
}
export function changeSubmitSaveAction(submitSave) {
  return {
    type: CHANGE_SUBMITSAVE,
    submitSave,
  };
}
export function changeSubmitSaveResultAction(submitSaveResult) {
  return {
    type: CHANGE_SUBMITSAVERESULT,
    submitSaveResult,
  };
}
export function changeSubmitSaveErrorAction(submitSaveError) {
  return {
    type: CHANGE_SUBMITSAVEERROR,
    submitSaveError,
  };
}
export function changeSubmitSaveSubmittingAction(submitSaveSubmitting) {
  return {
    type: CHANGE_SUBMITSAVESUBMITTING,
    submitSaveSubmitting,
  };
}
export function changeValidationDataAction(validationData) {
  return {
    type: CHANGE_VALIDATIONDATA,
    validationData,
  };
}
export function submitSaveAction(submitSave) {
  return {
    type: SUBMITSAVE,
    submitSave,
  };
}
export function processSaveAction(processSave) {
  return {
    type: PROCESSSAVE,
    processSave,
  };
}
export function doChangePasswordAction(doChangePassword) {
  return {
    type: DOCHANGEPASSWORD,
    doChangePassword,
  };
}
export function doValidatePasswordAction(doValidatePassword) {
  return {
    type: DOVALIDATEPASSWORD,
    doValidatePassword,
  };
}
export function validateAction(validate) {
  return {
    type: VALIDATE,
    validate,
  };
}
