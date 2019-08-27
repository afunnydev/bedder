/*
 *
 * UserProfilePropainerOne reducer
 *
 */

import { fromJS } from 'immutable';
import { defaultEmptyPhotos, addPhoto, removePhoto } from 'components/Photos/helperReducer';
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

export const initialState = fromJS({
  submitResult: null,
  submitError: null,
  submitting: false,
  photos: defaultEmptyPhotos,
  newPhoto: {},
  activePhoto: {},
  username: '',
  email: '',
  firstname: '',
  lastname: '',
  phone: '',
  age: '',
  sex: '',
  location: '',
  about: '',
  password: '',
  roles: '',
});

function userProfilePropainerOneReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SUBMITRESULT:
      return state.set('submitResult', action.submitResult).set('submitting', false);
    case CHANGE_SUBMITERROR:
      return state.set('submitError', action.submitError).set('submitting', false);
    case CHANGE_SUBMITTING:
      return state.set('submitting', action.submitting);
    case CHANGE_PHOTOS:
      return state.set('photos', action.photos);
    case CHANGE_NEWPHOTO:
      return state.set('newPhoto', action.newPhoto);
    case CHANGE_ACTIVEPHOTO:
      return state.set('activePhoto', action.activePhoto);
    case CHANGE_USERNAME:
      return state.set('username', action.username);
    case CHANGE_EMAIL:
      return state.set('email', action.email);
    case CHANGE_FIRSTNAME:
      return state.set('firstname', action.firstname);
    case CHANGE_LASTNAME:
      return state.set('lastname', action.lastname);
    case CHANGE_PHONE:
      return state.set('phone', action.phone);
    case CHANGE_AGE:
      return state.set('age', action.age);
    case CHANGE_SEX:
      return state.set('sex', action.sex);
    case CHANGE_LOCATION:
      return state.set('location', action.location);
    case CHANGE_ABOUT:
      return state.set('about', action.about);
    case CHANGE_PASSWORD:
      return state.set('password', action.password);
    case CHANGE_ROLES:
      return state.set('roles', action.roles);
    case SUBMIT:
      // alert('change this submit');
      return state.set('submitting', true);
    case ADDPHOTO:
      // alert('change this addPhoto');
      return addPhoto(action.addPhoto, state);
    case DELETEPROFILE:
      // alert('change this deleteProfile');
      return state;
    case DELETEPHOTO:
      // console.log('change this deletePhoto');
      return removePhoto(action.deletePhoto, state);
    case PROCESS:
      // console.log('process', state.get('submitResult').result);
      let res = state.get('submitResult').result;
      // alert('change this process');
      return state.set('firstname', res.firstname)
        .set('lastname', res.lastname)
        .set('about', res.about)
        .set('phone', res.phone)
        .set('photos', (res.photos) ? fromJS(res.photos) : defaultEmptyPhotos)
        .set('roles', res.roles)
        .set('email', res.email);
    default:
      return state;
  }
}

export default userProfilePropainerOneReducer;
