import { fromJS } from 'immutable';
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
  SUBMIT,
  ADDPHOTO,
  DELETEPHOTO,
  PROCESS,
} from './constants';

export const initialState = fromJS({
  submitResult: null,
  submitError: null,
  submitting: false,
  photos: [],
  email: '',
  firstname: '',
  lastname: '',
  about: '',
  newPassword: '',
  newPasswordRepeat: '',
});

function userProfilePropainerOneReducer(state = initialState, action) {
  switch (action.type) {
  case CHANGE_SUBMITRESULT:
    return state.set('submitResult', action.submitResult).set('submitting', false);
  case CHANGE_SUBMITERROR:
    return state.set('submitError', action.submitError).set('submitting', false);
  case CHANGE_SUBMITTING:
    return state.set('submitting', action.submitting);
  case CHANGE_EMAIL:
    return state.set('email', action.email);
  case CHANGE_FIRSTNAME:
    return state.set('firstname', action.firstname);
  case CHANGE_LASTNAME:
    return state.set('lastname', action.lastname);
  case CHANGE_ABOUT:
    return state.set('about', action.about);
  case CHANGE_NEWPASSWORD:
    return state.set('newPassword', action.password);
  case CHANGE_NEWPASSWORDREPEAT:
    return state.set('newPasswordRepeat', action.password);
  case SUBMIT:
    return state.set('submitting', true);
  case ADDPHOTO:
    // return addPhoto(action.addPhoto, state);
    return state;
  case DELETEPHOTO:
    // return removePhoto(action.deletePhoto, state);
    return state;
  case PROCESS:
    let res = state.get('submitResult').result;
    return state.set('firstname', res.firstname)
      .set('lastname', res.lastname)
      .set('about', res.about)
      .set('photos', (res.photos) ? fromJS(res.photos) : [])
      .set('email', res.email);
  default:
    return state;
  }
}

export default userProfilePropainerOneReducer;
