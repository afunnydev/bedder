/**
 *
 * ComponentStateless
 *
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom';
import AuthGrid from '../components/AuthGrid';
import AuthWrapper from '../components/AuthWrapper';

const styles = () => ({
  backButton: {
    position: 'fixed',
    top: '10px',
    left: '10px',
    color: '#fff',
  },
});

const AuthLayout = props => (
  <AuthWrapper>
    <IconButton
      onClick={props.history.goBack}
      className={props.classes.backButton}
    >
      <Icon className="fa fa-arrow-left" />
    </IconButton>
    <AuthGrid>{props.children}</AuthGrid>
  </AuthWrapper>
);

export default withStyles(styles)(withRouter(AuthLayout));
