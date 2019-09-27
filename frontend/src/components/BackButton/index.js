import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const BackButton = ({ history, children, ...otherProps }) => (
  <Button onClick={history.goBack} {...otherProps}>
    {children ? children : <ArrowBackIcon />}
  </Button>
);

export default withRouter(BackButton);
