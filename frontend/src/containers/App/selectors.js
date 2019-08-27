import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the App state domain
 */

const selectAppDomain = state =>
  state.get('App', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by App
 */

const makeSelectUser = () =>
  createSelector(selectAppDomain, state => state.get('user'));

export default makeSelectUser;
export { selectAppDomain, makeSelectUser };
