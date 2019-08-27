import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLoginPageDomain = state => state.get('forgotPage', initialState);

const makeSelectUsername = () =>
  createSelector(
    selectLoginPageDomain,
    state => state.get('username'),
  );

const makeSelectCode = () =>
  createSelector(
    selectLoginPageDomain,
    state => state.get('code'),
  );

const makeSelectPassword = () =>
  createSelector(
    selectLoginPageDomain,
    state => state.get('password'),
  );
const makeSelectPasswordRepeat = () =>
  createSelector(
    selectLoginPageDomain,
    state => state.get('passwordRepeat'),
  );

const makeSelectSubmitting = () =>
  createSelector(
    selectLoginPageDomain,
    state => state.get('submitting'),
  );

const makeSelectError = () =>
  createSelector(
    selectLoginPageDomain,
    state => state.get('error'),
  );

const makeSelectResult = () =>
  createSelector(
    selectLoginPageDomain,
    state => state.get('result'),
  );

const makeSelectSubmittingCode = () =>
  createSelector(
    selectLoginPageDomain,
    state => state.get('submittingCode'),
  );

const makeSelectErrorCode = () =>
  createSelector(
    selectLoginPageDomain,
    state => state.get('errorCode'),
  );

const makeSelectResultCode = () =>
  createSelector(
    selectLoginPageDomain,
    state => state.get('resultCode'),
  );

export {
  selectLoginPageDomain,
  makeSelectPassword,
  makeSelectPasswordRepeat,
  makeSelectUsername,
  makeSelectCode,
  makeSelectSubmitting,
  makeSelectError,
  makeSelectResult,
  makeSelectSubmittingCode,
  makeSelectErrorCode,
  makeSelectResultCode,
};
