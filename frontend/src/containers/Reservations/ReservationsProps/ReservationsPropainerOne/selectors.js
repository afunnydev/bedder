import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the reservationsPage state domain
 */

const selectReservationsPageDomain = state =>
  state.get('reservationsPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ReservationsPage
 */

const makeSelectReservationsPage = () =>
  createSelector(selectReservationsPageDomain, substate => substate.toJS());

const makeSelectReservationsPassed = () =>
  createSelector(selectReservationsPageDomain, state =>
    state.get('reservationsPassed'),
  );
const makeSelectReservationsUpcoming = () =>
  createSelector(selectReservationsPageDomain, state =>
    state.get('reservationsUpcoming'),
  );
const makeSelectReservationsNew = () =>
  createSelector(selectReservationsPageDomain, state =>
    state.get('reservationsNew'),
  );
const makeSelectReservationsFilter1 = () =>
  createSelector(selectReservationsPageDomain, state =>
    state.get('reservationsFilter1'),
  );
const makeSelectReservationsFilter2 = () =>
  createSelector(selectReservationsPageDomain, state =>
    state.get('reservationsFilter2'),
  );
const makeSelectReservationsFilter3 = () =>
  createSelector(selectReservationsPageDomain, state =>
    state.get('reservationsFilter3'),
  );
const makeSelectReservationsFilter4 = () =>
  createSelector(selectReservationsPageDomain, state =>
    state.get('reservationsFilter4'),
  );
const makeSelectGetReservationsResult = () =>
  createSelector(selectReservationsPageDomain, state =>
    state.get('getReservationsResult'),
  );
const makeSelectGetReservationsError = () =>
  createSelector(selectReservationsPageDomain, state =>
    state.get('getReservationsError'),
  );
const makeSelectGetReservationsSubmitting = () =>
  createSelector(selectReservationsPageDomain, state =>
    state.get('getReservationsSubmitting'),
  );
const makeSelectAcceptBookingResult = () =>
  createSelector(selectReservationsPageDomain, state =>
    state.get('acceptBookingResult'),
  );
const makeSelectAcceptBookingError = () =>
  createSelector(selectReservationsPageDomain, state =>
    state.get('acceptBookingError'),
  );
const makeSelectAcceptBookingSubmitting = () =>
  createSelector(selectReservationsPageDomain, state =>
    state.get('acceptBookingSubmitting'),
  );
const makeSelectAcceptAutoBookingResult = () =>
  createSelector(selectReservationsPageDomain, state =>
    state.get('acceptAutoBookingResult'),
  );
const makeSelectAcceptAutoBookingError = () =>
  createSelector(selectReservationsPageDomain, state =>
    state.get('acceptAutoBookingError'),
  );
const makeSelectAcceptAutoBookingSubmitting = () =>
  createSelector(selectReservationsPageDomain, state =>
    state.get('acceptAutoBookingSubmitting'),
  );
const makeSelectAcceptAutoOffBookingResult = () =>
  createSelector(selectReservationsPageDomain, state =>
    state.get('acceptAutoOffBookingResult'),
  );
const makeSelectAcceptAutoOffBookingError = () =>
  createSelector(selectReservationsPageDomain, state =>
    state.get('acceptAutoOffBookingError'),
  );
const makeSelectAcceptAutoOffBookingSubmitting = () =>
  createSelector(selectReservationsPageDomain, state =>
    state.get('acceptAutoOffBookingSubmitting'),
  );
const makeSelectDeclineBookingResult = () =>
  createSelector(selectReservationsPageDomain, state =>
    state.get('declineBookingResult'),
  );
const makeSelectDeclineBookingError = () =>
  createSelector(selectReservationsPageDomain, state =>
    state.get('declineBookingError'),
  );
const makeSelectDeclineBookingSubmitting = () =>
  createSelector(selectReservationsPageDomain, state =>
    state.get('declineBookingSubmitting'),
  );

export default makeSelectReservationsPage;
export {
  selectReservationsPageDomain,
  makeSelectReservationsPage,
  makeSelectReservationsPassed,
  makeSelectReservationsUpcoming,
  makeSelectReservationsNew,
  makeSelectReservationsFilter1,
  makeSelectReservationsFilter2,
  makeSelectReservationsFilter3,
  makeSelectReservationsFilter4,
  makeSelectGetReservationsResult,
  makeSelectGetReservationsError,
  makeSelectGetReservationsSubmitting,
  makeSelectAcceptBookingResult,
  makeSelectAcceptBookingError,
  makeSelectAcceptBookingSubmitting,
  makeSelectAcceptAutoBookingResult,
  makeSelectAcceptAutoBookingError,
  makeSelectAcceptAutoBookingSubmitting,
  makeSelectAcceptAutoOffBookingResult,
  makeSelectAcceptAutoOffBookingError,
  makeSelectAcceptAutoOffBookingSubmitting,
  makeSelectDeclineBookingResult,
  makeSelectDeclineBookingError,
  makeSelectDeclineBookingSubmitting,
};
