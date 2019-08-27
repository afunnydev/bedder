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

export default makeSelectAuthPage;
export { selectAuthPageDomain };
