/**
 *
 * UserProfilePropainerTwo
 * ??????
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import {
  makeSelectUserProfilePropainerTwo,
  makeSelectOldPassword,
  makeSelectNewPassword,
  makeSelectNewPasswordRepeat,
  makeSelectIsPasswordChange,
  makeSelectSubmitSave,
  makeSelectSubmitSaveResult,
  makeSelectSubmitSaveError,
  makeSelectSubmitSaveSubmitting,
  makeSelectValidationData,
} from './selectors';
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

import { mapStateToProps, mapDispatchToProps } from './mapProps';

import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class UserProfilePropainerTwo extends React.Component {
  render() {
    return (
      /* <div style={{display: 'none'}}>
        
OldPassword: <input onChange={this.props.onChangeOldPassword} value={this.props.oldPassword} />
NewPassword: <input onChange={this.props.onChangeNewPassword} value={this.props.newPassword} />
NewPasswordRepeat: <input onChange={this.props.onChangeNewPasswordRepeat} value={this.props.newPasswordRepeat} />
IsPasswordChange: <input onChange={this.props.onChangeIsPasswordChange} value={this.props.isPasswordChange} />
SubmitSave: <input onChange={this.props.onChangeSubmitSave} value={this.props.submitSave} />
SubmitSaveResult: <input onChange={this.props.onChangeSubmitSaveResult} value={this.props.submitSaveResult} />
SubmitSaveError: <input onChange={this.props.onChangeSubmitSaveError} value={this.props.submitSaveError} />
SubmitSaveSubmitting: <input onChange={this.props.onChangeSubmitSaveSubmitting} value={this.props.submitSaveSubmitting} />
ValidationData: <input onChange={this.props.onChangeValidationData} value={this.props.validationData} />
        
SubmitSave: <button onClick={this.props.submitSave}>TRY</button>
ProcessSave: <button onClick={this.props.processSave}>TRY</button>
DoChangePassword: <button onClick={this.props.doChangePassword}>TRY</button>
DoValidatePassword: <button onClick={this.props.doValidatePassword}>TRY</button>
Validate: <button onClick={this.props.validate}>TRY</button> 
      </div> */
      <React.Fragment>{this.props.children}</React.Fragment>
    );
  }
}

UserProfilePropainerTwo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'userProfilePageTwo', reducer });

export default compose(
  withReducer,
  withConnect,
)(UserProfilePropainerTwo);

export { withConnect };
