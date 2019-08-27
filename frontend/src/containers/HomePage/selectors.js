import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.get('homePage', initialState);
/**
 * Other specific selectors
 */

/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () =>
  createSelector(selectHomePageDomain, substate => substate.toJS());

const makeSelectLocation = () =>
  createSelector(selectHomePageDomain, state => state.get('location'));

const makeSelectFrom = () =>
  createSelector(selectHomePageDomain, state => state.get('from'));

const makeSelectTo = () =>
  createSelector(selectHomePageDomain, state => state.get('to'));

const makeSelectLat = () =>
  createSelector(selectHomePageDomain, state => state.get('lat'));

const makeSelectLon = () =>
  createSelector(selectHomePageDomain, state => state.get('lon'));

const makeSelectNumPeople = () =>
  createSelector(selectHomePageDomain, state => state.get('maxPersons'));

const makeSelectNumBed = () =>
  createSelector(selectHomePageDomain, state => state.get('numBed'));

const makeSelectSubmitting = () =>
  createSelector(selectHomePageDomain, state => state.get('submitting'));

const makeSelectSubmitError = () =>
  createSelector(selectHomePageDomain, state => state.get('submitError'));

const makeSelectSubmitResult = () =>
  createSelector(selectHomePageDomain, state => state.get('submitResult'));

const makeSelectIsMapView = () =>
  createSelector(selectHomePageDomain, state => state.get('isMapView'));

const makeSelectGridConfig = () =>
  createSelector(selectHomePageDomain, state => state.get('gridConfig'));

const makeSelectIsFilterByActive = () =>
  createSelector(selectHomePageDomain, state => state.get('isFilterByActive'));

const makeSelectFilterPrice = () =>
  createSelector(selectHomePageDomain, state => state.get('filterPrice'));

const makeSelectFilterPriceFrom = () =>
  createSelector(selectHomePageDomain, state => state.get('filterPriceFrom'));

const makeSelectFilterPriceTo = () =>
  createSelector(selectHomePageDomain, state => state.get('filterPriceTo'));

const makeSelectFilter1Star = () =>
  createSelector(selectHomePageDomain, state => state.get('filter1Star'));

const makeSelectFilter2Star = () =>
  createSelector(selectHomePageDomain, state => state.get('filter2Star'));

const makeSelectFilter3Star = () =>
  createSelector(selectHomePageDomain, state => state.get('filter3Star'));

const makeSelectFilter4Star = () =>
  createSelector(selectHomePageDomain, state => state.get('filter4Star'));

const makeSelectFilter5Star = () =>
  createSelector(selectHomePageDomain, state => state.get('filter5Star'));

const makeSelectFilterTypes = () =>
  createSelector(selectHomePageDomain, state => state.get('filterTypes'));

const makeSelectSortBy = () =>
  createSelector(selectHomePageDomain, state => state.get('sortBy'));

export default makeSelectHomePage;
export {
  selectHomePageDomain,
  makeSelectLocation,
  makeSelectFrom,
  makeSelectTo,
  makeSelectNumPeople,
  makeSelectNumBed,
  makeSelectSubmitting,
  makeSelectSubmitError,
  makeSelectSubmitResult,
  makeSelectLat,
  makeSelectLon,
  makeSelectIsMapView,
  makeSelectGridConfig,
  makeSelectIsFilterByActive,
  makeSelectFilterPrice,
  makeSelectFilterPriceFrom,
  makeSelectFilterPriceTo,
  makeSelectFilter1Star,
  makeSelectFilter2Star,
  makeSelectFilter3Star,
  makeSelectFilter4Star,
  makeSelectFilter5Star,
  makeSelectFilterTypes,
  makeSelectSortBy,
};
