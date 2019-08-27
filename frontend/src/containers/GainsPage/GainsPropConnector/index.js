/**
 *
 * GainsPropConnector
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import GainsPage from '../GainsPage/Loadable';
// import {withConnect as withConnectBU} from '../GainsPage';

import GainsPropainer from '../GainsProps/GainsPropainer/Loadable';
import { withConnect as GainsPropainerConnect } from '../GainsProps/GainsPropainer';
// import GainsPropainerTwo from '../GainsProps/GainsPropainerTwo/Loadable';
// import { withConnect as GainsPropainerTwoConnect } from '../GainsProps/GainsPropainerTwo';


/* eslint-disable react/prefer-stateless-function */
export class GainsPropConnector extends React.Component {
  render() {
    // const props
    return (
      <React.Fragment>
        <GainsPropainer>
          {/* <GainsPropainerTwo> */}
          <GainsPage {...this.props} />
          {/* </GainsPropainerTwo> */}
        </GainsPropainer>
      </React.Fragment>
    );
  }
}

GainsPropConnector.propTypes = {
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
  GainsPropainerConnect,
  // GainsPropainerTwoConnect,
  // withConnectBU,
)(GainsPropConnector);

export { withConnect };
