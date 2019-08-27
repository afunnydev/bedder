import {
  changeOldPasswordAction,
  changeNewPasswordAction,
  changeNewPasswordRepeatAction,
  changeIsPasswordChangeAction,
  changeSubmitSaveAction,
  changeSubmitSaveResultAction,
  changeSubmitSaveErrorAction,
  changeSubmitSaveSubmittingAction,
  changeValidationDataAction,
  submitSaveAction,
  processSaveAction,
  doChangePasswordAction,
  doValidatePasswordAction,
  validateAction,
} from './actions';
import {
  makeSelectOldPassword,
  makeSelectNewPassword,
  makeSelectNewPasswordRepeat,
  makeSelectIsPasswordChange,
  makeSelectSubmitSave,
  makeSelectSubmitSaveResult,
  makeSelectSubmitSaveError,
  makeSelectSubmitSaveSubmitting,
  makeSelectValidationData,
} from './selectors'; //{ makeSelectUserProfilePropainerTwo,
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  //userprofilepropainertwo: makeSelectUserProfilePropainerTwo(),

  oldPassword: makeSelectOldPassword(),
  newPassword: makeSelectNewPassword(),
  newPasswordRepeat: makeSelectNewPasswordRepeat(),
  isPasswordChange: makeSelectIsPasswordChange(),
  submitSave: makeSelectSubmitSave(),
  submitSaveResult: makeSelectSubmitSaveResult(),
  submitSaveError: makeSelectSubmitSaveError(),
  submitSaveSubmitting: makeSelectSubmitSaveSubmitting(),
  validationData: makeSelectValidationData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,

    submitSave: evt => {
      dispatch(submitSaveAction(evt));
    },
    processSave: evt => {
      dispatch(processSaveAction(evt));
    },
    doChangePassword: evt => {
      dispatch(doChangePasswordAction(evt.target.value));
    },
    doValidatePassword: evt => {
      dispatch(doValidatePasswordAction(evt.target.value));
    },
    validate: evt => {
      dispatch(validateAction(evt.target.value));
    },
    onChangeOldPassword: evt => {
      dispatch(changeOldPasswordAction(evt.target.value));
    },
    onChangeNewPassword: evt => {
      dispatch(changeNewPasswordAction(evt.target.value));
    },
    onChangeNewPasswordRepeat: evt => {
      dispatch(changeNewPasswordRepeatAction(evt.target.value));
    },
    onChangeIsPasswordChange: evt => {
      dispatch(changeIsPasswordChangeAction(evt.target.value));
    },
    onChangeSubmitSave: evt => {
      dispatch(changeSubmitSaveAction(evt.target.value));
    },
    onChangeSubmitSaveResult: evt => {
      dispatch(changeSubmitSaveResultAction(evt.target.value));
    },
    onChangeSubmitSaveError: evt => {
      dispatch(changeSubmitSaveErrorAction(evt.target.value));
    },
    onChangeSubmitSaveSubmitting: evt => {
      dispatch(changeSubmitSaveSubmittingAction(evt.target.value));
    },
    onChangeValidationData: evt => {
      dispatch(changeValidationDataAction(evt.target.value));
    },
  };
}

export { mapStateToProps, mapDispatchToProps };
