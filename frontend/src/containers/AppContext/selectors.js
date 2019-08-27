import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAppContextDomain = state => state.get('appContext', initialState);

const makeSelectAppContext = () =>
  createSelector(selectAppContextDomain, substate => substate.toJS());

const makeSelectAppContextUser = () =>
  createSelector(selectAppContextDomain, state => state.get('user'));

const makeSelectAppContextRole = () =>
  createSelector(selectAppContextDomain, state => state.get('role'));

export default makeSelectAppContext;
export { selectAppContextDomain, makeSelectAppContextUser, makeSelectAppContext, makeSelectAppContextRole };
