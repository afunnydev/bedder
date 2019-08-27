/**
 *
 * SignOutAndRedirect
 *
 */

import React from 'react';
import { Redirect } from 'react-router-dom';
import Bedder from 'bedder/bedder';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { userLogoutAction } from 'containers/AppContext/actions';
import { userLogoutAction as loginPageUserLogoutAction } from 'containers/Auth/LoginPage/actions';

import { withSnackbar } from 'notistack';

const SignOutAndRedirect = (props) => {
  Bedder.logout();
  props.dispatch(userLogoutAction());
  props.dispatch(loginPageUserLogoutAction());
  props.enqueueSnackbar('You successfully logged out. Have a great day ✌️', { variant: 'default' });
  return <Redirect to="/auth" />;
};

const withConnect = connect();

export default compose(
  withConnect,
  withSnackbar,
)(SignOutAndRedirect);
