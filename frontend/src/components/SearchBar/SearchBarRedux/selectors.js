import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the searchBar state domain
 */

const selectSearchBarDomain = state => state.get('searchBar', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SearchBar
 */

const makeSelectSearchBar = () => createSelector(selectSearchBarDomain, substate => substate.toJS());

const makeSelectLocation = () => createSelector(selectSearchBarDomain, state => state.get('locationText'));
const makeSelectFrom = () => createSelector(selectSearchBarDomain, state => state.get('from'));
const makeSelectTo = () => createSelector(selectSearchBarDomain, state => state.get('to'));
const makeSelectNumPeople = () => createSelector(selectSearchBarDomain, state => state.get('maxPersons'));
const makeSelectNumBed = () => createSelector(selectSearchBarDomain, state => state.get('numBed'));
const makeSelectLat = () => createSelector(selectSearchBarDomain, state => state.get('lat'));
const makeSelectLon = () => createSelector(selectSearchBarDomain, state => state.get('lon'));

export default makeSelectSearchBar;
export {
  selectSearchBarDomain,
  makeSelectSearchBar,
  makeSelectLocation,
  makeSelectFrom,
  makeSelectTo,
  makeSelectNumPeople,
  makeSelectNumBed,
  makeSelectLat,
  makeSelectLon,
};
