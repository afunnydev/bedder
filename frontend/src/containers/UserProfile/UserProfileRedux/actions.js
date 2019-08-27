import {
  CHANGE_SUBMITRESULT,
  CHANGE_SUBMITERROR,
  CHANGE_SUBMITTING,
  CHANGE_EMAIL,
  CHANGE_FIRSTNAME,
  CHANGE_LASTNAME,
  CHANGE_ABOUT,
  CHANGE_NEWPASSWORD,
  CHANGE_NEWPASSWORDREPEAT,
  ADDPHOTO,
  DELETEPHOTO,
  PROCESS,
  SUBMIT,
} from './constants';

export function changeSubmitResultAction(submitResult) {
  return {
    type: CHANGE_SUBMITRESULT,
    submitResult,
  };
}
export function changeSubmitErrorAction(submitError) {
  return {
    type: CHANGE_SUBMITERROR,
    submitError,
  };
}
export function changeSubmittingAction(submitting) {
  return {
    type: CHANGE_SUBMITTING,
    submitting,
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
export function changeAboutAction(about) {
  return {
    type: CHANGE_ABOUT,
    about,
  };
}
export function changeNewPasswordAction(password) {
  return {
    type: CHANGE_NEWPASSWORD,
    password,
  };
}
export function changeNewPasswordRepeatAction(password) {
  return {
    type: CHANGE_NEWPASSWORDREPEAT,
    password,
  };
}
export function submitAction(submit) {
  return {
    type: SUBMIT,
    submit,
  };
}
export function addPhotoAction(addPhoto) {
  return {
    type: ADDPHOTO,
    addPhoto,
  };
}
export function deletePhotoAction(deletePhoto) {
  return {
    type: DELETEPHOTO,
    deletePhoto,
  };
}
export function processAction(process) {
  return {
    type: PROCESS,
    process,
  };
}
