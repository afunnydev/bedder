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
} from './selectors'; //{ makeSelectUserProfilePropainerOne,
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  //userprofilepropainerone: makeSelectUserProfilePropainerOne(),

  submitResult: makeSelectSubmitResult(),
  submitError: makeSelectSubmitError(),
  submitting: makeSelectSubmitting(),
  photos: makeSelectPhotos(),
  newPhoto: makeSelectNewPhoto(),
  activePhoto: makeSelectActivePhoto(),
  username: makeSelectUsername(),
  email: makeSelectEmail(),
  firstname: makeSelectFirstname(),
  lastname: makeSelectLastname(),
  phone: makeSelectPhone(),
  age: makeSelectAge(),
  sex: makeSelectSex(),
  location: makeSelectLocation(),
  about: makeSelectAbout(),
  password: makeSelectPassword(),
  roles: makeSelectRoles(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,

    submit: evt => {
      dispatch(submitAction(evt));
    },
    addPhoto: evt => {
      dispatch(addPhotoAction(evt));
    },
    deleteProfile: evt => {
      dispatch(deleteProfileAction(evt));
    },
    deletePhoto: evt => {
      dispatch(deletePhotoAction(evt));
    },
    process: evt => {
      dispatch(processAction(evt));
    },
    onChangeSubmitResult: evt => {
      dispatch(changeSubmitResultAction(evt));
    },
    onChangeSubmitError: evt => {
      dispatch(changeSubmitErrorAction(evt));
    },
    onChangeSubmitting: evt => {
      dispatch(changeSubmittingAction(evt));
    },
    onChangePhotos: evt => {
      dispatch(changePhotosAction(evt.target.value));
    },
    onChangeNewPhoto: evt => {
      dispatch(changeNewPhotoAction(evt.target.value));
    },
    onChangeActivePhoto: evt => {
      dispatch(changeActivePhotoAction(evt.target.value));
    },
    onChangeUsername: evt => {
      dispatch(changeUsernameAction(evt.target.value));
    },
    onChangeEmail: evt => {
      dispatch(changeEmailAction(evt.target.value));
    },
    onChangeFirstname: evt => {
      dispatch(changeFirstnameAction(evt.target.value));
    },
    onChangeLastname: evt => {
      dispatch(changeLastnameAction(evt.target.value));
    },
    onChangePhone: evt => {
      dispatch(changePhoneAction(evt.target.value));
    },
    onChangeAge: evt => {
      dispatch(changeAgeAction(evt.target.value));
    },
    onChangeSex: evt => {
      dispatch(changeSexAction(evt.target.value));
    },
    onChangeLocation: evt => {
      dispatch(changeLocationAction(evt.target.value));
    },
    onChangeAbout: evt => {
      dispatch(changeAboutAction(evt.target.value));
    },
    onChangePassword: evt => {
      dispatch(changePasswordAction(evt.target.value));
    },
    onChangeRoles: evt => {
      dispatch(changeRolesAction(evt.target.value));
    },
  };
}

export { mapStateToProps, mapDispatchToProps };
