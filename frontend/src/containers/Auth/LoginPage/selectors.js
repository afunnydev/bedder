import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLoginPageDomain = state => state.get('loginPage', initialState);

const makeSelectUsername = () =>
  createSelector(
    selectLoginPageDomain,
    state => state.get('username'),
  );

const makeSelectPassword = () =>
  createSelector(
    selectLoginPageDomain,
    state => state.get('password'),
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

export {
  selectLoginPageDomain,
  makeSelectUsername,
  makeSelectPassword,
  makeSelectSubmitting,
  makeSelectError,
  makeSelectResult,
};
