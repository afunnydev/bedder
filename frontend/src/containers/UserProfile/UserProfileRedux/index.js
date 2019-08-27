/**
 *
 * UserProfilePropainerOne
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
  makeSelectUserProfilePropainerOne,
  makeSelectSubmitResult,
  makeSelectSubmitError,
  makeSelectSubmitting,
  makeSelectPhotos,
  makeSelectNewPhoto,
  makeSelectActivePhoto,
  makeSelectUsername,
  makeSelectEmail,
  makeSelectFirstname,
  makeSelectLastname,
  makeSelectPhone,
  makeSelectAge,
  makeSelectSex,
  makeSelectLocation,
  makeSelectAbout,
  makeSelectPassword,
  makeSelectRoles,
} from './selectors';
import {
  changeSubmitResultAction,
  changeSubmitErrorAction,
  changeSubmittingAction,
  changePhotosAction,
  changeNewPhotoAction,
  changeActivePhotoAction,
  changeUsernameAction,
  changeEmailAction,
  changeFirstnameAction,
  changeLastnameAction,
  changePhoneAction,
  changeAgeAction,
  changeSexAction,
  changeLocationAction,
  changeAboutAction,
  changePasswordAction,
  changeRolesAction,
  submitAction,
  addPhotoAction,
  deleteProfileAction,
  deletePhotoAction,
  processAction,
} from './actions';
import {
  CHANGE_SUBMITRESULT,
  CHANGE_SUBMITERROR,
  CHANGE_SUBMITTING,
  CHANGE_PHOTOS,
  CHANGE_NEWPHOTO,
  CHANGE_ACTIVEPHOTO,
  CHANGE_USERNAME,
  CHANGE_EMAIL,
  CHANGE_FIRSTNAME,
  CHANGE_LASTNAME,
  CHANGE_PHONE,
  CHANGE_AGE,
  CHANGE_SEX,
  CHANGE_LOCATION,
  CHANGE_ABOUT,
  CHANGE_PASSWORD,
  CHANGE_ROLES,
  SUBMIT,
  ADDPHOTO,
  DELETEPROFILE,
  DELETEPHOTO,
  PROCESS,
} from './constants';

import { mapStateToProps, mapDispatchToProps } from './mapProps';

import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class UserProfilePropainerOne extends React.Component {
  render() {
    return (
      /* <div style={{display: 'none'}}>
        
SubmitResult: <input onChange={this.props.onChangeSubmitResult} value={this.props.submitResult} />
SubmitError: <input onChange={this.props.onChangeSubmitError} value={this.props.submitError} />
Submitting: <input onChange={this.props.onChangeSubmitting} value={this.props.submitting} />
Photos: <input onChange={this.props.onChangePhotos} value={this.props.photos} />
NewPhoto: <input onChange={this.props.onChangeNewPhoto} value={this.props.newPhoto} />
ActivePhoto: <input onChange={this.props.onChangeActivePhoto} value={this.props.activePhoto} />
Username: <input onChange={this.props.onChangeUsername} value={this.props.username} />
Email: <input onChange={this.props.onChangeEmail} value={this.props.email} />
Firstname: <input onChange={this.props.onChangeFirstname} value={this.props.firstname} />
Lastname: <input onChange={this.props.onChangeLastname} value={this.props.lastname} />
Phone: <input onChange={this.props.onChangePhone} value={this.props.phone} />
Age: <input onChange={this.props.onChangeAge} value={this.props.age} />
Sex: <input onChange={this.props.onChangeSex} value={this.props.sex} />
Location: <input onChange={this.props.onChangeLocation} value={this.props.location} />
About: <input onChange={this.props.onChangeAbout} value={this.props.about} />
Password: <input onChange={this.props.onChangePassword} value={this.props.password} />
Roles: <input onChange={this.props.onChangeRoles} value={this.props.roles} />
        
Submit: <button onClick={this.props.submit}>TRY</button>
AddPhoto: <button onClick={this.props.addPhoto}>TRY</button>
DeleteProfile: <button onClick={this.props.deleteProfile}>TRY</button>
DeletePhoto: <button onClick={this.props.deletePhoto}>TRY</button>
Process: <button onClick={this.props.process}>TRY</button> 
      </div> */
      <React.Fragment>{this.props.children}</React.Fragment>
    );
  }
}

UserProfilePropainerOne.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'userProfilePage', reducer });

export default compose(
  withReducer,
  withConnect,
)(UserProfilePropainerOne);

export { withConnect };
