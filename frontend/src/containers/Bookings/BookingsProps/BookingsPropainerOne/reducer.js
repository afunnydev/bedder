/*
 *
 * BookingsPropainerOne reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_BOOKINGSPASSED,
  CHANGE_BOOKINGSUPCOMING,
  CHANGE_GETBOOKINGSRESULT,
  CHANGE_GETBOOKINGSERROR,
  CHANGE_GETBOOKINGSSUBMITTING,
  GETBOOKINGSUBMIT,
  GETBOOKINGPROCESS,
  SWITCHUPCOMING,
  SWITCHPASSED,
} from './constants';

export const initialState = fromJS({
  bookingsPassed: false,
  bookingsUpcoming: true,
  getBookingsResult: null,
  getBookingsError: null,
  getBookingsSubmitting: null,
});

function bookingsPropainerOneReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_BOOKINGSPASSED:
      return state.set('bookingsPassed', action.bookingsPassed);
    case CHANGE_BOOKINGSUPCOMING:
      return state.set('bookingsUpcoming', action.bookingsUpcoming);
    case CHANGE_GETBOOKINGSRESULT:
      return state.set('getBookingsResult', action.getBookingsResult).set('getBookingsSubmitting', false);
    case CHANGE_GETBOOKINGSERROR:
      return state.set('getBookingsError', action.getBookingsError).set('getBookingsSubmitting', false);
    case CHANGE_GETBOOKINGSSUBMITTING:
      return state.set('getBookingsSubmitting', action.getBookingsSubmitting);
    case GETBOOKINGSUBMIT:
      // alert('change this getBookingSubmit');
      return state.set('getBookingsSubmitting', true);
    case GETBOOKINGPROCESS:
      alert('change this getBookingProcess');
      return state;
    case SWITCHUPCOMING:
      // alert('change this switchUpcoming');
      return state.set('bookingsPassed', false).set('bookingsUpcoming', true);
    case SWITCHPASSED:
      // alert('change this switchPassed');
      return state.set('bookingsPassed', true).set('bookingsUpcoming', false);
    default:
      return state;
  }
}

export default bookingsPropainerOneReducer;
