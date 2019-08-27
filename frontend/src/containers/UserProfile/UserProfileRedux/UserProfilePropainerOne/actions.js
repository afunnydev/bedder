/*
 *
 * UserProfilePropainerOne actions
 *
 */

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
export function changePhotosAction(photos) {
  return {
    type: CHANGE_PHOTOS,
    photos,
  };
}
export function changeNewPhotoAction(newPhoto) {
  return {
    type: CHANGE_NEWPHOTO,
    newPhoto,
  };
}
export function changeActivePhotoAction(activePhoto) {
  return {
    type: CHANGE_ACTIVEPHOTO,
    activePhoto,
  };
}
export function changeUsernameAction(username) {
  return {
    type: CHANGE_USERNAME,
    username,
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
export function changePhoneAction(phone) {
  return {
    type: CHANGE_PHONE,
    phone,
  };
}
export function changeAgeAction(age) {
  return {
    type: CHANGE_AGE,
    age,
  };
}
export function changeSexAction(sex) {
  return {
    type: CHANGE_SEX,
    sex,
  };
}
export function changeLocationAction(location) {
  return {
    type: CHANGE_LOCATION,
    location,
  };
}
export function changeAboutAction(about) {
  return {
    type: CHANGE_ABOUT,
    about,
  };
}
export function changePasswordAction(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}
export function changeRolesAction(roles) {
  return {
    type: CHANGE_ROLES,
    roles,
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
export function deleteProfileAction(deleteProfile) {
  return {
    type: DELETEPROFILE,
    deleteProfile,
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
