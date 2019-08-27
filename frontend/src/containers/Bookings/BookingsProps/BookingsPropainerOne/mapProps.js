import {
  changeBookingsPassedAction,
  changeBookingsUpcomingAction,
  changeGetBookingsResultAction,
  changeGetBookingsErrorAction,
  changeGetBookingsSubmittingAction,
  getBookingSubmitAction,
  getBookingProcessAction,
  switchUpcomingAction,
  switchPassedAction,
} from './actions';
import {
  makeSelectBookingsPassed,
  makeSelectBookingsUpcoming,
  makeSelectGetBookingsResult,
  makeSelectGetBookingsError,
  makeSelectGetBookingsSubmitting,
} from './selectors'; //{ makeSelectBookingsPropainerOne,
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  //bookingspropainerone: makeSelectBookingsPropainerOne(),

  bookingsPassed: makeSelectBookingsPassed(),
  bookingsUpcoming: makeSelectBookingsUpcoming(),
  getBookingsResult: makeSelectGetBookingsResult(),
  getBookingsError: makeSelectGetBookingsError(),
  getBookingsSubmitting: makeSelectGetBookingsSubmitting(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,

    getBookingSubmit: evt => {
      dispatch(getBookingSubmitAction(evt));
    },
    getBookingProcess: evt => {
      dispatch(getBookingProcessAction(evt));
    },
    switchUpcoming: evt => {
      dispatch(switchUpcomingAction(evt));
    },
    switchPassed: evt => {
      dispatch(switchPassedAction(evt));
    },
    onChangeBookingsPassed: evt => {
      dispatch(changeBookingsPassedAction(evt));
    },
    onChangeBookingsUpcoming: evt => {
      dispatch(changeBookingsUpcomingAction(evt));
    },
    onChangeGetBookingsResult: evt => {
      dispatch(changeGetBookingsResultAction(evt));
    },
    onChangeGetBookingsError: evt => {
      dispatch(changeGetBookingsErrorAction(evt));
    },
    onChangeGetBookingsSubmitting: evt => {
      dispatch(changeGetBookingsSubmittingAction(evt));
    },
  };
}

export { mapStateToProps, mapDispatchToProps };
