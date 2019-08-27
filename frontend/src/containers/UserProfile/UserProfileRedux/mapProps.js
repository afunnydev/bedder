import {
  changeSubmitResultAction,
  changeSubmitErrorAction,
  changeSubmittingAction,
  changeEmailAction,
  changeFirstnameAction,
  changeLastnameAction,
  changeAboutAction,
  changeNewPasswordAction,
  changeNewPasswordRepeatAction,
  submitAction,
  addPhotoAction,
  deletePhotoAction,
  processAction,
} from './actions';
import {
  makeSelectSubmitResult,
  makeSelectSubmitError,
  makeSelectSubmitting,
  makeSelectPhotos,
  makeSelectEmail,
  makeSelectFirstname,
  makeSelectLastname,
  makeSelectAbout,
  makeSelectNewPassword,
  makeSelectNewPasswordRepeat,
} from './selectors'; 
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  submitResult: makeSelectSubmitResult(),
  submitError: makeSelectSubmitError(),
  submitting: makeSelectSubmitting(),
  photos: makeSelectPhotos(),
  email: makeSelectEmail(),
  firstname: makeSelectFirstname(),
  lastname: makeSelectLastname(),
  about: makeSelectAbout(),
  newPassword: makeSelectNewPassword(),
  newPasswordRepeat: makeSelectNewPasswordRepeat(),
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
    onChangeEmail: evt => {
      dispatch(changeEmailAction(evt.target.value));
    },
    onChangeFirstname: evt => {
      dispatch(changeFirstnameAction(evt.target.value));
    },
    onChangeLastname: evt => {
      dispatch(changeLastnameAction(evt.target.value));
    },
    onChangeAbout: evt => {
      dispatch(changeAboutAction(evt.target.value));
    },
    onChangeNewPassword: evt => {
      dispatch(changeNewPasswordAction(evt.target.value));
    },
    onChangeNewPasswordRepeat: evt => {
      dispatch(changeNewPasswordRepeatAction(evt.target.value));
    },
  };
}

export { mapStateToProps, mapDispatchToProps };
