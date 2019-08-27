import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMyAdsPageDomain = state =>
  state.get('myAdsPage', initialState);

const makeSelectMyAdsPage = () =>
  createSelector(selectMyAdsPageDomain, substate => substate.toJS());

const makeSelectResult = () =>
  createSelector(selectMyAdsPageDomain, state => state.get('result'));
const makeSelectError = () =>
  createSelector(selectMyAdsPageDomain, state => state.get('error'));
const makeSelectSubmitting = () =>
  createSelector(selectMyAdsPageDomain, state => state.get('submitting'));
const makeSelectData = () =>
  createSelector(selectMyAdsPageDomain, state => state.get('data'));

export default makeSelectMyAdsPage;
export {
  selectMyAdsPageDomain,
  makeSelectMyAdsPage,
  makeSelectResult,
  makeSelectError,
  makeSelectSubmitting,
  makeSelectData,
};
