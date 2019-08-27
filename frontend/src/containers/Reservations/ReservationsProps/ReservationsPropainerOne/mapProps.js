import {
  changeReservationsPassedAction,
  changeReservationsUpcomingAction,
  changeReservationsNewAction,
  changeReservationsFilter1Action,
  changeReservationsFilter2Action,
  changeReservationsFilter3Action,
  changeReservationsFilter4Action,
  changeGetReservationsResultAction,
  changeGetReservationsErrorAction,
  changeGetReservationsSubmittingAction,
  changeAcceptBookingResultAction,
  changeAcceptBookingErrorAction,
  changeAcceptBookingSubmittingAction,
  changeAcceptAutoBookingResultAction,
  changeAcceptAutoBookingErrorAction,
  changeAcceptAutoBookingSubmittingAction,
  changeAcceptAutoOffBookingResultAction,
  changeAcceptAutoOffBookingErrorAction,
  changeAcceptAutoOffBookingSubmittingAction,
  changeDeclineBookingResultAction,
  changeDeclineBookingErrorAction,
  changeDeclineBookingSubmittingAction,
  acceptBookingAction,
  acceptAutoBookingAction,
  acceptAutoOffBookingAction,
  declineBookingAction,
  getReservationsSubmitAction,
  getReservationsProcessAction,
  switchUpcomingAction,
  switchPassedAction,
  switchNewAction,
  switchFilter1Action,
  switchFilter2Action,
  switchFilter3Action,
  switchFilter4Action,
} from './actions';
import {
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
} from './selectors'; //{ makeSelectReservationsPropainerOne,
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  //reservationspropainerone: makeSelectReservationsPropainerOne(),

  reservationsPassed: makeSelectReservationsPassed(),
  reservationsUpcoming: makeSelectReservationsUpcoming(),
  reservationsNew: makeSelectReservationsNew(),
  reservationsFilter1: makeSelectReservationsFilter1(),
  reservationsFilter2: makeSelectReservationsFilter2(),
  reservationsFilter3: makeSelectReservationsFilter3(),
  reservationsFilter4: makeSelectReservationsFilter4(),
  getReservationsResult: makeSelectGetReservationsResult(),
  getReservationsError: makeSelectGetReservationsError(),
  getReservationsSubmitting: makeSelectGetReservationsSubmitting(),
  acceptBookingResult: makeSelectAcceptBookingResult(),
  acceptBookingError: makeSelectAcceptBookingError(),
  acceptBookingSubmitting: makeSelectAcceptBookingSubmitting(),
  acceptAutoBookingResult: makeSelectAcceptAutoBookingResult(),
  acceptAutoBookingError: makeSelectAcceptAutoBookingError(),
  acceptAutoBookingSubmitting: makeSelectAcceptAutoBookingSubmitting(),
  acceptAutoOffBookingResult: makeSelectAcceptAutoOffBookingResult(),
  acceptAutoOffBookingError: makeSelectAcceptAutoOffBookingError(),
  acceptAutoOffBookingSubmitting: makeSelectAcceptAutoOffBookingSubmitting(),
  declineBookingResult: makeSelectDeclineBookingResult(),
  declineBookingError: makeSelectDeclineBookingError(),
  declineBookingSubmitting: makeSelectDeclineBookingSubmitting(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,

    acceptBooking: (evt, bookingId) => {
      dispatch(acceptBookingAction(evt, bookingId));
    },
    acceptAutoBooking: (evt, bookingId) => {
      dispatch(acceptAutoBookingAction(evt, bookingId));
    },
    acceptAutoOffBooking: (evt, bookingId) => {
      dispatch(acceptAutoOffBookingAction(evt, bookingId));
    },
    declineBooking: (evt, bookingId) => {
      dispatch(declineBookingAction(evt, bookingId));
    },
    getReservationsSubmit: evt => {
      dispatch(getReservationsSubmitAction(evt));
    },
    getReservationsProcess: evt => {
      dispatch(getReservationsProcessAction(evt));
    },
    switchUpcoming: evt => {
      dispatch(switchUpcomingAction(evt));
    },
    switchPassed: evt => {
      dispatch(switchPassedAction(evt));
    },
    switchNew: evt => {
      dispatch(switchNewAction(evt));
    },
    switchFilter1: evt => {
      dispatch(switchFilter1Action(evt));
    },
    switchFilter2: evt => {
      dispatch(switchFilter2Action(evt));
    },
    switchFilter3: evt => {
      dispatch(switchFilter3Action(evt));
    },
    switchFilter4: evt => {
      dispatch(switchFilter4Action(evt));
    },
    onChangeReservationsPassed: evt => {
      dispatch(changeReservationsPassedAction(evt));
    },
    onChangeReservationsUpcoming: evt => {
      dispatch(changeReservationsUpcomingAction(evt));
    },
    onChangeReservationsNew: evt => {
      dispatch(changeReservationsNewAction(evt));
    },
    onChangeReservationsFilter1: evt => {
      dispatch(changeReservationsFilter1Action(evt));
    },
    onChangeReservationsFilter2: evt => {
      dispatch(changeReservationsFilter2Action(evt));
    },
    onChangeReservationsFilter3: evt => {
      dispatch(changeReservationsFilter3Action(evt));
    },
    onChangeReservationsFilter4: evt => {
      dispatch(changeReservationsFilter4Action(evt));
    },
    onChangeGetReservationsResult: evt => {
      dispatch(changeGetReservationsResultAction(evt));
    },
    onChangeGetReservationsError: evt => {
      dispatch(changeGetReservationsErrorAction(evt));
    },
    onChangeGetReservationsSubmitting: evt => {
      dispatch(changeGetReservationsSubmittingAction(evt));
    },
    onChangeAcceptBookingResult: (evt, bookingId) => {
      dispatch(changeAcceptBookingResultAction(evt, bookingId));
    },
    onChangeAcceptBookingError: (evt, bookingId) => {
      dispatch(changeAcceptBookingErrorAction(evt, bookingId));
    },
    onChangeAcceptBookingSubmitting: (evt, bookingId) => {
      dispatch(changeAcceptBookingSubmittingAction(evt, bookingId));
    },
    onChangeAcceptAutoBookingResult: (evt, bookingId) => {
      dispatch(changeAcceptAutoBookingResultAction(evt, bookingId));
    },
    onChangeAcceptAutoBookingError: (evt, bookingId) => {
      dispatch(changeAcceptAutoBookingErrorAction(evt, bookingId));
    },
    onChangeAcceptAutoBookingSubmitting: (evt, bookingId) => {
      dispatch(changeAcceptAutoBookingSubmittingAction(evt, bookingId));
    },
    onChangeAcceptAutoOffBookingResult: (evt, bookingId) => {
      dispatch(changeAcceptAutoOffBookingResultAction(evt, bookingId));
    },
    onChangeAcceptAutoOffBookingError: (evt, bookingId) => {
      dispatch(changeAcceptAutoOffBookingErrorAction(evt, bookingId));
    },
    onChangeAcceptAutoOffBookingSubmitting: (evt, bookingId) => {
      dispatch(changeAcceptAutoOffBookingSubmittingAction(evt, bookingId));
    },
    onChangeDeclineBookingResult: (evt, bookingId) => {
      dispatch(changeDeclineBookingResultAction(evt, bookingId));
    },
    onChangeDeclineBookingError: (evt, bookingId) => {
      dispatch(changeDeclineBookingErrorAction(evt, bookingId));
    },
    onChangeDeclineBookingSubmitting: (evt, bookingId) => {
      dispatch(changeDeclineBookingSubmittingAction(evt, bookingId));
    },
  };
}

export { mapStateToProps, mapDispatchToProps };
