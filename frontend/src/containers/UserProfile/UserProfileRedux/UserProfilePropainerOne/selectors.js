import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userProfilePage state domain
 */

const selectUserProfilePageDomain = state =>
  state.get('userProfilePage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserProfilePage
 */

const makeSelectUserProfilePage = () =>
  createSelector(selectUserProfilePageDomain, substate => substate.toJS());

const makeSelectSubmitResult = () =>
  createSelector(selectUserProfilePageDomain, state =>
    state.get('submitResult'),
  );
const makeSelectSubmitError = () =>
  createSelector(selectUserProfilePageDomain, state =>
    state.get('submitError'),
  );
const makeSelectSubmitting = () =>
  createSelector(selectUserProfilePageDomain, state => state.get('submitting'));
const makeSelectPhotos = () =>
  createSelector(selectUserProfilePageDomain, state => state.get('photos'));
const makeSelectNewPhoto = () =>
  createSelector(selectUserProfilePageDomain, state => state.get('newPhoto'));
const makeSelectActivePhoto = () =>
  createSelector(selectUserProfilePageDomain, state =>
    state.get('activePhoto'),
  );
const makeSelectUsername = () =>
  createSelector(selectUserProfilePageDomain, state => state.get('username'));
const makeSelectEmail = () =>
  createSelector(selectUserProfilePageDomain, state => state.get('email'));
const makeSelectFirstname = () =>
  createSelector(selectUserProfilePageDomain, state => state.get('firstname'));
const makeSelectLastname = () =>
  createSelector(selectUserProfilePageDomain, state => state.get('lastname'));
const makeSelectPhone = () =>
  createSelector(selectUserProfilePageDomain, state => state.get('phone'));
const makeSelectAge = () =>
  createSelector(selectUserProfilePageDomain, state => state.get('age'));
const makeSelectSex = () =>
  createSelector(selectUserProfilePageDomain, state => state.get('sex'));
const makeSelectLocation = () =>
  createSelector(selectUserProfilePageDomain, state => state.get('location'));
const makeSelectAbout = () =>
  createSelector(selectUserProfilePageDomain, state => state.get('about'));
const makeSelectPassword = () =>
  createSelector(selectUserProfilePageDomain, state => state.get('password'));
const makeSelectRoles = () =>
  createSelector(selectUserProfilePageDomain, state => state.get('roles'));

export default makeSelectUserProfilePage;
export {
  selectUserProfilePageDomain,
  makeSelectUserProfilePage,
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
};
