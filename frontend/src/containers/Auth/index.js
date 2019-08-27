import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import AuthPage from 'containers/Auth/AuthPage/Loadable';
import ForgotPage from 'containers/Auth/ForgotPage/Loadable';
import LoginPage from 'containers/Auth/LoginPage/Loadable';
import SignUpPage from 'containers/Auth/SignUpPage/Loadable';
import SignOutAndRedirect from 'components/SignOutAndRedirect';

import LogoFormGrid from './components/LogoFormGrid';
import AuthLayout from './AuthLayout';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff',
      contrastText: '#000',
    },
    secondary: {
      main: '#fff',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: ['Ubuntu'].join(','),
  },
});

const Auth = () => (
  <AuthLayout>
    <MuiThemeProvider theme={theme}>
      <LogoFormGrid>
        <Switch>
          <Route path="/auth/signIn" component={LoginPage} />
          <Route path="/auth/forgot" component={ForgotPage} />
          <Route path="/auth/signUp/:validationID?" component={SignUpPage} />
          <Route path="/auth/signOut" component={SignOutAndRedirect} />
          <Route path="/auth" component={AuthPage} />
        </Switch>
      </LogoFormGrid>
    </MuiThemeProvider>
  </AuthLayout>
);

export default Auth;
