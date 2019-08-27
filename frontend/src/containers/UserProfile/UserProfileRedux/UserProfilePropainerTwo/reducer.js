/*
 *
 * UserProfilePropainerTwo reducer
 *
 */

import { fromJS } from 'immutable';
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

export const initialState = fromJS({
  oldPassword: '',
  newPassword: '',
  newPasswordRepeat: '',
  isPasswordChange: false,
  submitSave: null,
  submitSaveResult: null,
  submitSaveError: null,
  submitSaveSubmitting: false,
  validationData: null,
});

function userProfilePropainerTwoReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_OLDPASSWORD:
      return state.set('oldPassword', action.oldPassword);
    case CHANGE_NEWPASSWORD:
      return state.set('newPassword', action.newPassword);
    case CHANGE_NEWPASSWORDREPEAT:
      return state.set('newPasswordRepeat', action.newPasswordRepeat);
    case CHANGE_ISPASSWORDCHANGE:
      return state.set('isPasswordChange', action.isPasswordChange);
    case CHANGE_SUBMITSAVE:
      return state.set('submitSave', action.submitSave);
    case CHANGE_SUBMITSAVERESULT:
      return state.set('submitSaveResult', action.submitSaveResult).set('submitSaveSubmitting', false);
    case CHANGE_SUBMITSAVEERROR:
      return state.set('submitSaveError', action.submitSaveError).set('submitSaveSubmitting', false);
    case CHANGE_SUBMITSAVESUBMITTING:
      return state.set('submitSaveSubmitting', action.submitSaveSubmitting);
    case CHANGE_VALIDATIONDATA:
      return state.set('validationData', action.validationData);
    case SUBMITSAVE:
      // alert('change this submitSave');
      return state.set('submitSaveSubmitting', true).set('submitSaveResult', null).set('submitSaveError', null);
    case PROCESSSAVE:
      alert('change this processSave');
      return state;
    case DOCHANGEPASSWORD:
      alert('change this doChangePassword');
      return state;
    case DOVALIDATEPASSWORD:
      alert('change this doValidatePassword');
      return state;
    case VALIDATE:
      alert('change this validate');
      return state;
    default:
      return state;
  }
}

export default userProfilePropainerTwoReducer;
