/*
 * SignUpPage Messages
 *
 * This contains all the text for the SignUpPage component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  userExists: {
    id: 'app.containers.LoginPage.error.userExists',
    defaultMessage: 'User with provided email is already registered.',
  },
  email: {
    id: 'app.containers.LoginPage.error.email',
    defaultMessage: 'Enter your email address',
  },
  firstname: {
    id: 'app.containers.LoginPage.error.firstname',
    defaultMessage: 'First name',
  },
  lastname: {
    id: 'app.containers.LoginPage.error.lastname',
    defaultMessage: 'Last name',
  },
  password: {
    id: 'app.containers.LoginPage.error.password',
    defaultMessage: 'Enter your password',
  },
  passwordRepeat: {
    id: 'app.containers.LoginPage.error.passwordRepeat',
    defaultMessage: 'Repeat your password',
  },
  signUp: {
    id: 'app.containers.LoginPage.error.signUp',
    defaultMessage: 'Sign Up',
  },
  signUpTitle: {
    id: 'app.containers.LoginPage.error.signUpTitle',
    defaultMessage: 'Sign Up',
  },
});
