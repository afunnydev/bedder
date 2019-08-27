/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  unauthorized: {
    id: 'app.containers.LoginPage.error.unauthorized',
    defaultMessage: 'Unauthorized! Bad credentials!',
  },
  login: {
    id: 'app.containers.LoginPage.error.login',
    defaultMessage: 'Sign In',
  },
  email: {
    id: 'app.containers.LoginPage.error.email',
    defaultMessage: 'Enter your email address',
  },
  password: {
    id: 'app.containers.LoginPage.error.password',
    defaultMessage: 'Enter your password',
  },
  signIn: {
    id: 'app.containers.LoginPage.error.signIn',
    defaultMessage: 'Sign In',
  },
});
