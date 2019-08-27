/**
 *
 * ErrorNetwork
 *
 */

import React from 'react';

import Typography from '@material-ui/core/Typography';

/* eslint-disable react/prefer-stateless-function */
class ErrorNetwork extends React.Component {
  renderError(status) {
    switch (status) {
      case 404:
        return 'Resource not found';
      case 403:
        return 'Access denied';
      default:
        return 'Unknown' + status;
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.error && this.props.error.response &&
          (
            <Typography color="error">
              Error:
              {this.renderError(this.props.error.response.status)}
              {/*{this.props.error.response.status == 404 && ("Resource not found")}*/}
              {/*{this.props.error.response.status == 403 && ("Access denied")}*/}
            </Typography>
          )
        }
        {this.props.error && !this.props.error.response &&
          (
            <Typography color="error" paragraph={true}>
              Looks like your internet connexion was interrupted.

            </Typography>
          )
        }
      </React.Fragment>
    );
  }
}

ErrorNetwork.propTypes = {};

export default ErrorNetwork;
