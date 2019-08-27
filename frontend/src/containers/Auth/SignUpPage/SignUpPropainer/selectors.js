import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the signUpPage state domain
 */

const selectSignUpPageDomain = state =>
  state.get('signUpPagePropainer', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SignUpPage
 */

const makeSelectSignUpPage = () =>
  createSelector(
    selectSignUpPageDomain,
    substate => substate.toJS(),
  );

const makeSelectFacebookSubmitting = () =>
  createSelector(
    selectSignUpPageDomain,
    state => state.get('facebookSubmitting'),
  );
const makeSelectFacebookResult = () =>
  createSelector(
    selectSignUpPageDomain,
    state => state.get('facebookResult'),
  );
const makeSelectFacebookError = () =>
  createSelector(
    selectSignUpPageDomain,
    state => state.get('facebookError'),
  );
const makeSelectFacebookOauthResult = () =>
  createSelector(
    selectSignUpPageDomain,
    state => state.get('facebookOauthResult'),
  );

export default makeSelectSignUpPage;
export {
  selectSignUpPageDomain,
  makeSelectSignUpPage,
  makeSelectFacebookSubmitting,
  makeSelectFacebookResult,
  makeSelectFacebookError,
  makeSelectFacebookOauthResult,
};
