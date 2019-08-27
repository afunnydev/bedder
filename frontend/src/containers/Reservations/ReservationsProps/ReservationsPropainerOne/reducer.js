/*
 *
 * ReservationsPropainerOne reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_RESERVATIONSPASSED,
  CHANGE_RESERVATIONSUPCOMING,
  CHANGE_RESERVATIONSNEW,
  CHANGE_RESERVATIONSFILTER1,
  CHANGE_RESERVATIONSFILTER2,
  CHANGE_RESERVATIONSFILTER3,
  CHANGE_RESERVATIONSFILTER4,
  CHANGE_GETRESERVATIONSRESULT,
  CHANGE_GETRESERVATIONSERROR,
  CHANGE_GETRESERVATIONSSUBMITTING,
  CHANGE_ACCEPTBOOKINGRESULT,
  CHANGE_ACCEPTBOOKINGERROR,
  CHANGE_ACCEPTBOOKINGSUBMITTING,
  CHANGE_ACCEPTAUTOBOOKINGRESULT,
  CHANGE_ACCEPTAUTOBOOKINGERROR,
  CHANGE_ACCEPTAUTOBOOKINGSUBMITTING,
  CHANGE_ACCEPTAUTOOFFBOOKINGRESULT,
  CHANGE_ACCEPTAUTOOFFBOOKINGERROR,
  CHANGE_ACCEPTAUTOOFFBOOKINGSUBMITTING,
  CHANGE_DECLINEBOOKINGRESULT,
  CHANGE_DECLINEBOOKINGERROR,
  CHANGE_DECLINEBOOKINGSUBMITTING,
  ACCEPTBOOKING,
  ACCEPTAUTOBOOKING,
  ACCEPTAUTOOFFBOOKING,
  DECLINEBOOKING,
  GETRESERVATIONSSUBMIT,
  GETRESERVATIONSPROCESS,
  SWITCHUPCOMING,
  SWITCHPASSED,
  SWITCHNEW,
  SWITCHFILTER1,
  SWITCHFILTER2,
  SWITCHFILTER3,
  SWITCHFILTER4,
} from './constants';

export const initialState = fromJS({
  reservationsPassed: false,
  reservationsUpcoming: false,
  reservationsNew: true,
  reservationsFilter1: false,
  reservationsFilter2: false,
  reservationsFilter3: false,
  reservationsFilter4: false,
  getReservationsResult: null,
  getReservationsError: null,
  getReservationsSubmitting: false,
  acceptBookingResult: {},
  acceptBookingError: {},
  acceptBookingSubmitting: {},
  acceptAutoBookingResult: {},
  acceptAutoBookingError: {},
  acceptAutoBookingSubmitting: {},
  acceptAutoOffBookingResult: {},
  acceptAutoOffBookingError: {},
  acceptAutoOffBookingSubmitting: {},
  declineBookingResult: {},
  declineBookingError: {},
  declineBookingSubmitting: {},
});

function reservationsPropainerOneReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_RESERVATIONSPASSED:
      return state.set('reservationsPassed', action.reservationsPassed);
    case CHANGE_RESERVATIONSUPCOMING:
      return state.set('reservationsUpcoming', action.reservationsUpcoming);
    case CHANGE_RESERVATIONSNEW:
      return state.set('reservationsNew', action.reservationsNew);
    case CHANGE_RESERVATIONSFILTER1:
      return state.set('reservationsFilter1', action.reservationsFilter1);
    case CHANGE_RESERVATIONSFILTER2:
      return state.set('reservationsFilter2', action.reservationsFilter2);
    case CHANGE_RESERVATIONSFILTER3:
      return state.set('reservationsFilter3', action.reservationsFilter3);
    case CHANGE_RESERVATIONSFILTER4:
      return state.set('reservationsFilter4', action.reservationsFilter4);
    case CHANGE_GETRESERVATIONSRESULT:
      return state.set('getReservationsResult', action.getReservationsResult).set('getReservationsSubmitting', false);
    case CHANGE_GETRESERVATIONSERROR:
      return state.set('getReservationsError', action.getReservationsError).set('getReservationsSubmitting', false);
    case CHANGE_GETRESERVATIONSSUBMITTING:
      return state.set(
        'getReservationsSubmitting',
        action.getReservationsSubmitting,
      );
    case CHANGE_ACCEPTBOOKINGRESULT:
      return state.setIn(['acceptBookingResult', action.bookingId], action.acceptBookingResult).setIn(['acceptBookingSubmitting', action.bookingId], false);
    case CHANGE_ACCEPTBOOKINGERROR:
      return state.setIn(['acceptBookingError', action.bookingId], action.acceptBookingError).setIn(['acceptBookingSubmitting', action.bookingId], false);
    case CHANGE_ACCEPTBOOKINGSUBMITTING:
      return state.setIn(['acceptBookingSubmitting', action.bookingId], action.acceptBookingSubmitting);
    case CHANGE_ACCEPTAUTOBOOKINGRESULT:
      return state.setIn(['acceptAutoBookingResult', action.bookingId], action.acceptAutoBookingResult).setIn(['acceptAutoBookingSubmitting', action.bookingId], false);
    case CHANGE_ACCEPTAUTOBOOKINGERROR:
      return state.setIn(['acceptAutoBookingError', action.bookingId], action.acceptAutoBookingError).setIn(['acceptAutoBookingSubmitting', action.bookingId], false);
    case CHANGE_ACCEPTAUTOBOOKINGSUBMITTING:
      return state.setIn(['acceptAutoBookingSubmitting', action.bookingId], action.acceptAutoBookingSubmitting);
    case CHANGE_ACCEPTAUTOOFFBOOKINGRESULT:
      return state.setIn(['acceptAutoOffBookingResult', action.bookingId], action.acceptAutoBookingResult).setIn(['acceptAutoOffBookingSubmitting', action.bookingId], false);
    case CHANGE_ACCEPTAUTOOFFBOOKINGERROR:
      return state.setIn(['acceptAutoOffBookingError', action.bookingId], action.acceptAutoBookingError).setIn(['acceptAutoOffBookingSubmitting', action.bookingId], false);
    case CHANGE_ACCEPTAUTOOFFBOOKINGSUBMITTING:
      return state.setIn(['acceptAutoOffBookingSubmitting', action.bookingId], action.acceptAutoOffBookingSubmitting);
    case CHANGE_DECLINEBOOKINGRESULT:
      return state.setIn(['declineBookingResult', action.bookingId], action.declineBookingResult).setIn(['declineBookingSubmitting', action.bookingId], false);
    case CHANGE_DECLINEBOOKINGERROR:
      return state.setIn(['declineBookingError', action.bookingId], action.declineBookingError).setIn(['declineBookingSubmitting', action.bookingId], false);
    case CHANGE_DECLINEBOOKINGSUBMITTING:
      return state.setIn(['declineBookingSubmitting', action.bookingId], action.declineBookingSubmitting);
    case ACCEPTBOOKING:
      // alert('change this acceptBooking');
      return state.setIn(
        ['acceptBookingSubmitting', action.bookingId],
        true,
      );
    case ACCEPTAUTOBOOKING:
      // alert('change this acceptAutoBooking');
      return state.setIn(
        ['acceptAutoBookingSubmitting', action.bookingId],
        true,
      );
    case ACCEPTAUTOOFFBOOKING:
      // alert('change this acceptAutoBooking');
      return state.setIn(
        ['acceptAutoOffBookingSubmitting', action.bookingId],
        true,
      );
    case DECLINEBOOKING:
      // alert('change this declineBooking');
      return state.setIn(
        ['declineBookingSubmitting', action.bookingId],
        true,
      );
    case GETRESERVATIONSSUBMIT:
      // alert('change this getReservationsSubmit');
      return state.set('getReservationsSubmitting', true);
    case GETRESERVATIONSPROCESS:
      // alert('change this getReservationsProcess');
      return state;
    case SWITCHUPCOMING:
      // alert('change this switchUpcoming');
      return state.set('reservationsPassed', false).set('reservationsUpcoming', true).set('reservationsNew', false);
    case SWITCHPASSED:
      // alert('change this switchPassed');
      return state.set('reservationsPassed', true).set('reservationsUpcoming', false).set('reservationsNew', false);
    case SWITCHNEW:
      // alert('change this switchNew');
      return state.set('reservationsPassed', false).set('reservationsUpcoming', false).set('reservationsNew', true);
    case SWITCHFILTER1:
      // alert('change this switchFilter1');
      return state;
    case SWITCHFILTER2:
      // alert('change this switchFilter2');
      return state;
    case SWITCHFILTER3:
      // alert('change this switchFilter3');
      return state;
    case SWITCHFILTER4:
      // alert('change this switchFilter4');
      return state;
    default:
      return state;
  }
}

export default reservationsPropainerOneReducer;
