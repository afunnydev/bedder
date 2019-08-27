import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the signUpPage state domain
 */

const selectSignUpPageDomain = state => state.get('signUpPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SignUpPage
 */

// const makeSelectSignUpPage = () =>
//   createSelector(selectSignUpPageDomain, substate => substate.toJS());

const makeSelectEmail = () =>
  createSelector(
    selectSignUpPageDomain,
    state => state.get('email'),
  );

const makeSelectCode = () =>
  createSelector(
    selectSignUpPageDomain,
    state => state.get('code'),
  );

const makeSelectFirstname = () =>
  createSelector(
    selectSignUpPageDomain,
    state => state.get('firstname'),
  );

const makeSelectLastname = () =>
  createSelector(
    selectSignUpPageDomain,
    state => state.get('lastname'),
  );

const makeSelectPassword = () =>
  createSelector(
    selectSignUpPageDomain,
    state => state.get('password'),
  );

const makeSelectPasswordRepeat = () =>
  createSelector(
    selectSignUpPageDomain,
    state => state.get('passwordRepeat'),
  );

const makeSelectSubmitting = () =>
  createSelector(
    selectSignUpPageDomain,
    state => state.get('submitting'),
  );

const makeSelectError = () =>
  createSelector(
    selectSignUpPageDomain,
    state => state.get('error'),
  );

const makeSelectResult = () =>
  createSelector(
    selectSignUpPageDomain,
    state => state.get('result'),
  );

const makeSelectSubmittingCode = () =>
  createSelector(
    selectSignUpPageDomain,
    state => state.get('submittingCode'),
  );

const makeSelectErrorCode = () =>
  createSelector(
    selectSignUpPageDomain,
    state => state.get('errorCode'),
  );

const makeSelectResultCode = () =>
  createSelector(
    selectSignUpPageDomain,
    state => state.get('resultCode'),
  );

// export default makeSelectSignUpPage;
export {
  makeSelectEmail,
  makeSelectCode,
  makeSelectPassword,
  makeSelectPasswordRepeat,
  makeSelectResult,
  makeSelectSubmitting,
  makeSelectError,
  makeSelectResultCode,
  makeSelectSubmittingCode,
  makeSelectErrorCode,
  makeSelectFirstname,
  makeSelectLastname,
};
