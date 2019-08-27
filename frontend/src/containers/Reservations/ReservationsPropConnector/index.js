/**
 *
 * ReservationsPropConnector
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import ReservationsPage from '../ReservationsPage/Loadable';
// import {withConnect as withConnectBU} from '../ReservationsPage';

import ReservationsPropainerOne from '../ReservationsProps/ReservationsPropainerOne/Loadable';
import { withConnect as ReservationsPropainerOneConnect } from '../ReservationsProps/ReservationsPropainerOne';
// import ReservationsPropainerTwo from '../ReservationsProps/ReservationsPropainerTwo/Loadable';
// import { withConnect as ReservationsPropainerTwoConnect } from '../ReservationsProps/ReservationsPropainerTwo';


/* eslint-disable react/prefer-stateless-function */
export class ReservationsPropConnector extends React.Component {
  render() {
    // const props
    return (
      <React.Fragment>
        <ReservationsPropainerOne>
          {/*<ReservationsPropainerTwo>*/}
            <ReservationsPage {...this.props} />
          {/*</ReservationsPropainerTwo>*/}
        </ReservationsPropainerOne>
      </React.Fragment>
        );
  }
}

ReservationsPropConnector.propTypes = {
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
  ReservationsPropainerOneConnect,
  // ReservationsPropainerTwoConnect,
  // withConnectBU,
)(ReservationsPropConnector);

export { withConnect };
