/**
 *
 * ReservationsPropainerOne
 * ??????
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import {
  makeSelectReservationsPropainerOne,
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
  makeSelectDeclineBookingResult,
  makeSelectDeclineBookingError,
  makeSelectDeclineBookingSubmitting,
} from './selectors';
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
  changeDeclineBookingResultAction,
  changeDeclineBookingErrorAction,
  changeDeclineBookingSubmittingAction,
  acceptBookingAction,
  acceptAutoBookingAction,
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
  CHANGE_DECLINEBOOKINGRESULT,
  CHANGE_DECLINEBOOKINGERROR,
  CHANGE_DECLINEBOOKINGSUBMITTING,
  ACCEPTBOOKING,
  ACCEPTAUTOBOOKING,
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

import { mapStateToProps, mapDispatchToProps } from './mapProps';

import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class ReservationsPropainerOne extends React.Component {
  render() {
    return (
      /* <div style={{display: 'none'}}>
        
ReservationsPassed: <input onChange={this.props.onChangeReservationsPassed} value={this.props.reservationsPassed} />
ReservationsUpcoming: <input onChange={this.props.onChangeReservationsUpcoming} value={this.props.reservationsUpcoming} />
ReservationsNew: <input onChange={this.props.onChangeReservationsNew} value={this.props.reservationsNew} />
ReservationsFilter1: <input onChange={this.props.onChangeReservationsFilter1} value={this.props.reservationsFilter1} />
ReservationsFilter2: <input onChange={this.props.onChangeReservationsFilter2} value={this.props.reservationsFilter2} />
ReservationsFilter3: <input onChange={this.props.onChangeReservationsFilter3} value={this.props.reservationsFilter3} />
ReservationsFilter4: <input onChange={this.props.onChangeReservationsFilter4} value={this.props.reservationsFilter4} />
GetReservationsResult: <input onChange={this.props.onChangeGetReservationsResult} value={this.props.getReservationsResult} />
GetReservationsError: <input onChange={this.props.onChangeGetReservationsError} value={this.props.getReservationsError} />
GetReservationsSubmitting: <input onChange={this.props.onChangeGetReservationsSubmitting} value={this.props.getReservationsSubmitting} />
AcceptBookingResult: <input onChange={this.props.onChangeAcceptBookingResult} value={this.props.acceptBookingResult} />
AcceptBookingError: <input onChange={this.props.onChangeAcceptBookingError} value={this.props.acceptBookingError} />
AcceptBookingSubmitting: <input onChange={this.props.onChangeAcceptBookingSubmitting} value={this.props.acceptBookingSubmitting} />
AcceptAutoBookingResult: <input onChange={this.props.onChangeAcceptAutoBookingResult} value={this.props.acceptAutoBookingResult} />
AcceptAutoBookingError: <input onChange={this.props.onChangeAcceptAutoBookingError} value={this.props.acceptAutoBookingError} />
AcceptAutoBookingSubmitting: <input onChange={this.props.onChangeAcceptAutoBookingSubmitting} value={this.props.acceptAutoBookingSubmitting} />
DeclineBookingResult: <input onChange={this.props.onChangeDeclineBookingResult} value={this.props.declineBookingResult} />
DeclineBookingError: <input onChange={this.props.onChangeDeclineBookingError} value={this.props.declineBookingError} />
DeclineBookingSubmitting: <input onChange={this.props.onChangeDeclineBookingSubmitting} value={this.props.declineBookingSubmitting} />
        
AcceptBooking: <button onClick={this.props.acceptBooking}>TRY</button>
AcceptAutoBooking: <button onClick={this.props.acceptAutoBooking}>TRY</button>
DeclineBooking: <button onClick={this.props.declineBooking}>TRY</button>
GetReservationsSubmit: <button onClick={this.props.getReservationsSubmit}>TRY</button>
GetReservationsProcess: <button onClick={this.props.getReservationsProcess}>TRY</button>
SwitchUpcoming: <button onClick={this.props.switchUpcoming}>TRY</button>
SwitchPassed: <button onClick={this.props.switchPassed}>TRY</button>
SwitchNew: <button onClick={this.props.switchNew}>TRY</button>
SwitchFilter1: <button onClick={this.props.switchFilter1}>TRY</button>
SwitchFilter2: <button onClick={this.props.switchFilter2}>TRY</button>
SwitchFilter3: <button onClick={this.props.switchFilter3}>TRY</button>
SwitchFilter4: <button onClick={this.props.switchFilter4}>TRY</button> 
      </div> */
      <React.Fragment>{this.props.children}</React.Fragment>
    );
  }
}

ReservationsPropainerOne.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'reservationsPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(ReservationsPropainerOne);

export { withConnect };
