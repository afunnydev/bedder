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
const makeSelectEmail = () =>
  createSelector(selectUserProfilePageDomain, state => state.get('email'));
const makeSelectFirstname = () =>
  createSelector(selectUserProfilePageDomain, state => state.get('firstname'));
const makeSelectLastname = () =>
  createSelector(selectUserProfilePageDomain, state => state.get('lastname'));
const makeSelectAbout = () =>
  createSelector(selectUserProfilePageDomain, state => state.get('about'));
const makeSelectNewPassword = () =>
  createSelector(selectUserProfilePageDomain, state => state.get('newPassword'));
const makeSelectNewPasswordRepeat = () =>
  createSelector(selectUserProfilePageDomain, state => state.get('newPasswordRepeat'));

export default makeSelectUserProfilePage;
export {
  selectUserProfilePageDomain,
  makeSelectUserProfilePage,
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
};
