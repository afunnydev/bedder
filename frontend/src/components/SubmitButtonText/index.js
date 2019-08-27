import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const style = {
  white: {
    color: 'white',
  },
  spaced: {
    margin: '0 50px',
  },
};

const SubmitButtonText = ({ loading, text, classes }) => {
  if (loading) {
    // Don't know why, but doesn't work if I return the component without de fragment
    return (<React.Fragment>
      <CircularProgress size={24} classes={{ root: classes.spaced, circle: classes.white }} />
    </React.Fragment>);
  }
  return <span>{text}</span>;
};

SubmitButtonText.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  text: PropTypes.string,
};

SubmitButtonText.defaultProps = {
  text: 'Submit',
};

export default withStyles(style)(SubmitButtonText);
