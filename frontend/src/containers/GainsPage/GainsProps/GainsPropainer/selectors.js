import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gainsPage state domain
 */

const selectGainsPageDomain = state => state.get('gainsPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by GainsPage
 */

const makeSelectGainsPage = () => createSelector(selectGainsPageDomain, substate => substate.toJS());

const makeSelectGainsSubmitting = () => createSelector(selectGainsPageDomain, state => state.get('gainsSubmitting'));
const makeSelectGainsResult = () => createSelector(selectGainsPageDomain, state => state.get('gainsResult'));
const makeSelectGainsError = () => createSelector(selectGainsPageDomain, state => state.get('gainsError'));
const makeSelectGains1 = () => createSelector(selectGainsPageDomain, state => state.get('gains1'));
const makeSelectGains2 = () => createSelector(selectGainsPageDomain, state => state.get('gains2'));
const makeSelectGains3 = () => createSelector(selectGainsPageDomain, state => state.get('gains3'));

export default makeSelectGainsPage;
export {
  selectGainsPageDomain,
  makeSelectGainsPage,
  makeSelectGainsSubmitting,
  makeSelectGainsResult,
  makeSelectGainsError,
  makeSelectGains1,
  makeSelectGains2,
  makeSelectGains3,
};
