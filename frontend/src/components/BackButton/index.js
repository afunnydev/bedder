/**
 *
 * BackButton
 *
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

var BackButtonRouter = ({history}) => {

};

BackButtonRouter = withRouter(BackButtonRouter);

function BackButton(props) {
  const { history, staticContext, match, location, ...otherProps } = props;
  // console.log('otherProps', props);
  return (
      <Button onClick={history.goBack} {...otherProps}>
        {props.children ? props.children : <ArrowBackIcon />}
      </Button>
  );
}

BackButton.propTypes = {};

export default withRouter(BackButton);
