/*
 * AuthPage Messages
 *
 * This contains all the text for the AuthPage component.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
  hello: {
    id: 'app.containers.AuthPage.hello',
    defaultMessage: 'Hello! Sign in with:',
  },
  signUp: {
    id: 'app.containers.AuthPage.signUp',
    defaultMessage: "Don't have an account? Sign up here.",
  },
});
