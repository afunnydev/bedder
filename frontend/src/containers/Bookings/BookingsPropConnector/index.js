/**
 *
 * BookingsPropConnector
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import BookingsPage from '../BookingsPage/Loadable';
// import {withConnect as withConnectBU} from '../BookingsPage';

import BookingsPropainerOne from '../BookingsProps/BookingsPropainerOne/Loadable';
import { withConnect as BookingsPropainerOneConnect } from '../BookingsProps/BookingsPropainerOne';
// import BookingsPropainerTwo from '../BookingsProps/BookingsPropainerTwo/Loadable';
// import { withConnect as BookingsPropainerTwoConnect } from '../BookingsProps/BookingsPropainerTwo';


/* eslint-disable react/prefer-stateless-function */
export class BookingsPropConnector extends React.Component {
  render() {
    // const props
    return (
      <React.Fragment>
        <BookingsPropainerOne>
          {/*<BookingsPropainerTwo>*/}
            <BookingsPage {...this.props} />
          {/*</BookingsPropainerTwo>*/}
        </BookingsPropainerOne>
      </React.Fragment>
        );
  }
}

BookingsPropConnector.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  BookingsPropainerOneConnect,
  // BookingsPropainerTwoConnect,
  // withConnectBU,
)(BookingsPropConnector);

export { withConnect };
