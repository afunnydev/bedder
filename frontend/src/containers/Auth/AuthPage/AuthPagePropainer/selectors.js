import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the authPage state domain
 */

const selectAuthPageDomain = state => state.get('authPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AuthPage
 */

const makeSelectAuthPage = () =>
  createSelector(selectAuthPageDomain, substate => substate.toJS());

const makeSelectFacebookSubmitting = () =>
  createSelector(selectAuthPageDomain, state =>
    state.get('facebookSubmitting'),
  );
const makeSelectFacebookResult = () =>
  createSelector(selectAuthPageDomain, state => state.get('facebookResult'));
const makeSelectFacebookError = () =>
  createSelector(selectAuthPageDomain, state => state.get('facebookError'));
const makeSelectFacebookOauthResult = () =>
  createSelector(selectAuthPageDomain, state =>
    state.get('facebookOauthResult'),
  );

export default makeSelectAuthPage;
export {
  selectAuthPageDomain,
  makeSelectAuthPage,
  makeSelectFacebookSubmitting,
  makeSelectFacebookResult,
  makeSelectFacebookError,
  makeSelectFacebookOauthResult,
};
