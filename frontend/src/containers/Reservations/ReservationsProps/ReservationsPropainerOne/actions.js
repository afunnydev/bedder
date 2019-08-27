/*
 *
 * ReservationsPropainerOne actions
 *
 */

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

export function changeReservationsPassedAction(reservationsPassed) {
  return {
    type: CHANGE_RESERVATIONSPASSED,
    reservationsPassed,
  };
}
export function changeReservationsUpcomingAction(reservationsUpcoming) {
  return {
    type: CHANGE_RESERVATIONSUPCOMING,
    reservationsUpcoming,
  };
}
export function changeReservationsNewAction(reservationsNew) {
  return {
    type: CHANGE_RESERVATIONSNEW,
    reservationsNew,
  };
}
export function changeReservationsFilter1Action(reservationsFilter1) {
  return {
    type: CHANGE_RESERVATIONSFILTER1,
    reservationsFilter1,
  };
}
export function changeReservationsFilter2Action(reservationsFilter2) {
  return {
    type: CHANGE_RESERVATIONSFILTER2,
    reservationsFilter2,
  };
}
export function changeReservationsFilter3Action(reservationsFilter3) {
  return {
    type: CHANGE_RESERVATIONSFILTER3,
    reservationsFilter3,
  };
}
export function changeReservationsFilter4Action(reservationsFilter4) {
  return {
    type: CHANGE_RESERVATIONSFILTER4,
    reservationsFilter4,
  };
}
export function changeGetReservationsResultAction(getReservationsResult) {
  return {
    type: CHANGE_GETRESERVATIONSRESULT,
    getReservationsResult,
  };
}
export function changeGetReservationsErrorAction(getReservationsError) {
  return {
    type: CHANGE_GETRESERVATIONSERROR,
    getReservationsError,
  };
}
export function changeGetReservationsSubmittingAction(
  getReservationsSubmitting,
) {
  return {
    type: CHANGE_GETRESERVATIONSSUBMITTING,
    getReservationsSubmitting,
  };
}
export function changeAcceptBookingResultAction(acceptBookingResult, bookingId) {
  return {
    type: CHANGE_ACCEPTBOOKINGRESULT,
    acceptBookingResult,
    bookingId,
  };
}
export function changeAcceptBookingErrorAction(acceptBookingError, bookingId) {
  return {
    type: CHANGE_ACCEPTBOOKINGERROR,
    acceptBookingError,
    bookingId,
  };
}
export function changeAcceptBookingSubmittingAction(acceptBookingSubmitting, bookingId) {
  return {
    type: CHANGE_ACCEPTBOOKINGSUBMITTING,
    acceptBookingSubmitting, bookingId,
  };
}
export function changeAcceptAutoBookingResultAction(acceptAutoBookingResult, bookingId) {
  return {
    type: CHANGE_ACCEPTAUTOBOOKINGRESULT,
    acceptAutoBookingResult, bookingId,
  };
}
export function changeAcceptAutoBookingErrorAction(acceptAutoBookingError, bookingId) {
  return {
    type: CHANGE_ACCEPTAUTOBOOKINGERROR,
    acceptAutoBookingError, bookingId,
  };
}
export function changeAcceptAutoBookingSubmittingAction(
  acceptAutoBookingSubmitting, bookingId
) {
  return {
    type: CHANGE_ACCEPTAUTOBOOKINGSUBMITTING,
    acceptAutoBookingSubmitting, bookingId
  };
}

export function changeAcceptAutoOffBookingResultAction(acceptAutoOffBookingResult, bookingId) {
  return {
    type: CHANGE_ACCEPTAUTOOFFBOOKINGRESULT,
    acceptAutoOffBookingResult, bookingId,
  };
}
export function changeAcceptAutoOffBookingErrorAction(acceptAutoOffBookingError, bookingId) {
  return {
    type: CHANGE_ACCEPTAUTOOFFBOOKINGERROR,
    acceptAutoOffBookingError, bookingId,
  };
}
export function changeAcceptAutoOffBookingSubmittingAction(
  acceptAutoOffBookingSubmitting, bookingId
) {
  return {
    type: CHANGE_ACCEPTAUTOOFFBOOKINGSUBMITTING,
    acceptAutoOffBookingSubmitting, bookingId
  };
}

export function changeDeclineBookingResultAction(declineBookingResult, bookingId) {
  return {
    type: CHANGE_DECLINEBOOKINGRESULT,
    declineBookingResult, bookingId,
  };
}
export function changeDeclineBookingErrorAction(declineBookingError, bookingId) {
  return {
    type: CHANGE_DECLINEBOOKINGERROR,
    declineBookingError, bookingId,
  };
}
export function changeDeclineBookingSubmittingAction(declineBookingSubmitting, bookingId) {
  return {
    type: CHANGE_DECLINEBOOKINGSUBMITTING,
    declineBookingSubmitting, bookingId,
  };
}
export function acceptBookingAction(acceptBooking, bookingId) {
  return {
    type: ACCEPTBOOKING,
    acceptBooking,
    bookingId,
  };
}
export function acceptAutoBookingAction(acceptAutoBooking, bookingId) {
  return {
    type: ACCEPTAUTOBOOKING,
    acceptAutoBooking,
    bookingId,
  };
}
export function acceptAutoOffBookingAction(acceptAutoOffBooking, bookingId) {
  return {
    type: ACCEPTAUTOOFFBOOKING,
    acceptAutoOffBooking,
    bookingId,
  };
}
export function declineBookingAction(declineBooking, bookingId) {
  return {
    type: DECLINEBOOKING,
    declineBooking,
    bookingId,
  };
}
export function getReservationsSubmitAction(getReservationsSubmit) {
  return {
    type: GETRESERVATIONSSUBMIT,
    getReservationsSubmit,
  };
}
export function getReservationsProcessAction(getReservationsProcess) {
  return {
    type: GETRESERVATIONSPROCESS,
    getReservationsProcess,
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
export function switchNewAction(switchNew) {
  return {
    type: SWITCHNEW,
    switchNew,
  };
}
export function switchFilter1Action(switchFilter1) {
  return {
    type: SWITCHFILTER1,
    switchFilter1,
  };
}
export function switchFilter2Action(switchFilter2) {
  return {
    type: SWITCHFILTER2,
    switchFilter2,
  };
}
export function switchFilter3Action(switchFilter3) {
  return {
    type: SWITCHFILTER3,
    switchFilter3,
  };
}
export function switchFilter4Action(switchFilter4) {
  return {
    type: SWITCHFILTER4,
    switchFilter4,
  };
}
