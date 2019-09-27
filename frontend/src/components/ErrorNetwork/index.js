import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const ErrorNetwork = (props) => {
  const renderError = (status) => {
    switch (status) {
    case 404:
      return 'Resource not found';
    case 403:
      return 'Access denied';
    default:
      return 'Unknown' + status;
    }
  };

  return (
    <React.Fragment>
      {props.error && props.error.response &&
        (
          <Typography color="error">
            Error:
            {renderError(props.error.response.status)}
            {/*{props.error.response.status == 404 && ("Resource not found")}*/}
            {/*{props.error.response.status == 403 && ("Access denied")}*/}
          </Typography>
        )
      }
      {props.error && !props.error.response &&
        (
          <Typography color="error" paragraph={true}>
            Looks like your internet connexion was interrupted.

          </Typography>
        )
      }
    </React.Fragment>
  );
};

ErrorNetwork.propTypes = {
  error: PropTypes.object.isRequired
};

export default ErrorNetwork;
