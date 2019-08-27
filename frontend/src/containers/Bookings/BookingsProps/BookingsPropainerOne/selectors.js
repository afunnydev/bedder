import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the bookingsPage state domain
 */

const selectBookingsPageDomain = state =>
  state.get('bookingsPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BookingsPage
 */

const makeSelectBookingsPage = () =>
  createSelector(selectBookingsPageDomain, substate => substate.toJS());

const makeSelectBookingsPassed = () =>
  createSelector(selectBookingsPageDomain, state =>
    state.get('bookingsPassed'),
  );
const makeSelectBookingsUpcoming = () =>
  createSelector(selectBookingsPageDomain, state =>
    state.get('bookingsUpcoming'),
  );
const makeSelectGetBookingsResult = () =>
  createSelector(selectBookingsPageDomain, state =>
    state.get('getBookingsResult'),
  );
const makeSelectGetBookingsError = () =>
  createSelector(selectBookingsPageDomain, state =>
    state.get('getBookingsError'),
  );
const makeSelectGetBookingsSubmitting = () =>
  createSelector(selectBookingsPageDomain, state =>
    state.get('getBookingsSubmitting'),
  );

export default makeSelectBookingsPage;
export {
  selectBookingsPageDomain,
  makeSelectBookingsPage,
  makeSelectBookingsPassed,
  makeSelectBookingsUpcoming,
  makeSelectGetBookingsResult,
  makeSelectGetBookingsError,
  makeSelectGetBookingsSubmitting,
};
