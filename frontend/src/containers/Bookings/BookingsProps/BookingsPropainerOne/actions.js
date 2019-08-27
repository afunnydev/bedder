/*
 *
 * BookingsPropainerOne actions
 *
 */

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

export function changeBookingsPassedAction(bookingsPassed) {
  return {
    type: CHANGE_BOOKINGSPASSED,
    bookingsPassed,
  };
}
export function changeBookingsUpcomingAction(bookingsUpcoming) {
  return {
    type: CHANGE_BOOKINGSUPCOMING,
    bookingsUpcoming,
  };
}
export function changeGetBookingsResultAction(getBookingsResult) {
  return {
    type: CHANGE_GETBOOKINGSRESULT,
    getBookingsResult,
  };
}
export function changeGetBookingsErrorAction(getBookingsError) {
  return {
    type: CHANGE_GETBOOKINGSERROR,
    getBookingsError,
  };
}
export function changeGetBookingsSubmittingAction(getBookingsSubmitting) {
  return {
    type: CHANGE_GETBOOKINGSSUBMITTING,
    getBookingsSubmitting,
  };
}
export function getBookingSubmitAction(getBookingSubmit) {
  return {
    type: GETBOOKINGSUBMIT,
    getBookingSubmit,
  };
}
export function getBookingProcessAction(getBookingProcess) {
  return {
    type: GETBOOKINGPROCESS,
    getBookingProcess,
  };
}
export function switchUpcomingAction(switchUpcoming) {
  return {
    type: SWITCHUPCOMING,
    switchUpcoming,
  };
}
export function switchPassedAction(switchPassed) {
  return {
    type: SWITCHPASSED,
    switchPassed,
  };
}
