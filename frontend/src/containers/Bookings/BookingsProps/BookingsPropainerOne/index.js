/**
 *
 * BookingsPropainerOne
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
  makeSelectBookingsPropainerOne,
  makeSelectBookingsPassed,
  makeSelectBookingsUpcoming,
  makeSelectGetBookingsResult,
  makeSelectGetBookingsError,
  makeSelectGetBookingsSubmitting,
} from './selectors';
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

import { mapStateToProps, mapDispatchToProps } from './mapProps';

import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class BookingsPropainerOne extends React.Component {
  render() {
    return (
      /* <div style={{display: 'none'}}>
        
BookingsPassed: <input onChange={this.props.onChangeBookingsPassed} value={this.props.bookingsPassed} />
BookingsUpcoming: <input onChange={this.props.onChangeBookingsUpcoming} value={this.props.bookingsUpcoming} />
GetBookingsResult: <input onChange={this.props.onChangeGetBookingsResult} value={this.props.getBookingsResult} />
GetBookingsError: <input onChange={this.props.onChangeGetBookingsError} value={this.props.getBookingsError} />
GetBookingsSubmitting: <input onChange={this.props.onChangeGetBookingsSubmitting} value={this.props.getBookingsSubmitting} />
        
GetBookingSubmit: <button onClick={this.props.getBookingSubmit}>TRY</button>
GetBookingProcess: <button onClick={this.props.getBookingProcess}>TRY</button>
SwitchUpcoming: <button onClick={this.props.switchUpcoming}>TRY</button>
SwitchPassed: <button onClick={this.props.switchPassed}>TRY</button> 
      </div> */
      <React.Fragment>{this.props.children}</React.Fragment>
    );
  }
}

BookingsPropainerOne.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'bookingsPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(BookingsPropainerOne);

export { withConnect };
