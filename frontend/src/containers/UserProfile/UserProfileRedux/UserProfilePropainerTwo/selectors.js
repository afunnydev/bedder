import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userProfilePageTwo state domain
 */

const selectUserProfilePageTwoDomain = state =>
  state.get('userProfilePageTwo', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserProfilePageTwo
 */

const makeSelectUserProfilePageTwo = () =>
  createSelector(selectUserProfilePageTwoDomain, substate => substate.toJS());

const makeSelectOldPassword = () =>
  createSelector(selectUserProfilePageTwoDomain, state =>
    state.get('oldPassword'),
  );
const makeSelectNewPassword = () =>
  createSelector(selectUserProfilePageTwoDomain, state =>
    state.get('newPassword'),
  );
const makeSelectNewPasswordRepeat = () =>
  createSelector(selectUserProfilePageTwoDomain, state =>
    state.get('newPasswordRepeat'),
  );
const makeSelectIsPasswordChange = () =>
  createSelector(selectUserProfilePageTwoDomain, state =>
    state.get('isPasswordChange'),
  );
const makeSelectSubmitSave = () =>
  createSelector(selectUserProfilePageTwoDomain, state =>
    state.get('submitSave'),
  );
const makeSelectSubmitSaveResult = () =>
  createSelector(selectUserProfilePageTwoDomain, state =>
    state.get('submitSaveResult'),
  );
const makeSelectSubmitSaveError = () =>
  createSelector(selectUserProfilePageTwoDomain, state =>
    state.get('submitSaveError'),
  );
const makeSelectSubmitSaveSubmitting = () =>
  createSelector(selectUserProfilePageTwoDomain, state =>
    state.get('submitSaveSubmitting'),
  );
const makeSelectValidationData = () =>
  createSelector(selectUserProfilePageTwoDomain, state =>
    state.get('validationData'),
  );

export default makeSelectUserProfilePageTwo;
export {
  selectUserProfilePageTwoDomain,
  makeSelectUserProfilePageTwo,
  makeSelectOldPassword,
  makeSelectNewPassword,
  makeSelectNewPasswordRepeat,
  makeSelectIsPasswordChange,
  makeSelectSubmitSave,
  makeSelectSubmitSaveResult,
  makeSelectSubmitSaveError,
  makeSelectSubmitSaveSubmitting,
  makeSelectValidationData,
};
