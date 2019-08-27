import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import injectReducer from 'utils/injectReducer';
import Bedder from 'bedder/bedder';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import ScrollToTop from 'components/ScrollToTop';

import {
  makeSelectAppContextUser,
  makeSelectAppContextRole,
} from './selectors';
import reducer from './reducer';
import { changeRoleAction } from './actions';
import { ROLE_OWNER, ROLE_EXPLORER, ROLE_TRAVELER } from './constants';

import { UserProvider, RoleProvider } from './context';

Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const overrides = {
  MuiInput: {
    root: {
      fontWeight: 300,
      paddingLeft: 2,
    },
  },
  MuiInputBase: {
    input: {
      backgroundColor: 'transparent',
    }
  },
  MuiInputLabel: {
    root: {
      fontWeight: 500,
      color: 'black',
    },
    shrink: {
      transform: 'translate(0, 1.5px)',
      fontSize: 14,
      lineHeight: '16px',
    },
  },
  MuiFormLabel: {
    root: {
      fontWeight: 500,
      color: 'black',
      fontSize: '1rem',
    },
  },
  MuiTypography: {
    h1: {
      fontSize: 50,
      marginBottom: 20,
    },
    h4: {
      fontSize: 35,
    },
  }
};

export const themeTraveler = createMuiTheme({
  palette: {
    primary: {
      light: '#c26c6a',
      main: '#8f3f3f',
      dark: '#5d1219',
      contrastText: '#fff',
    },
    secondary: {
      light: '#7b6ac0',
      main: '#4b3f8f',
      dark: '#191861',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'Ubuntu',
    ].join(','),
  },
  overrides,
});

export const themeExplorer = createMuiTheme({
  palette: {
    primary: {
      light: '#c26c6a',
      main: '#8f3f3f',
      dark: '#5d1219',
      contrastText: '#fff',
    },
    secondary: {
      light: '#7b6ac0',
      main: '#4b3f8f',
      dark: '#191861',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'Ubuntu',
    ].join(','),
  },
  overrides,
});

export const themeOwner = createMuiTheme({
  palette: {
    primary: {
      // light: '#c26c6a',
      main: '#000',
      // dark: '#5d1219',
      contrastText: '#fff',
    },
    secondary: {
      // light: '#7b6ac0',
      main: '#000',
      // dark: '#191861',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'Ubuntu',
    ].join(','),
  },
  overrides,
});

export const pathnameToRole = {
  ROLE_OWNER: [
    '/reservations',
    '/ownerAds',
  ],
  ROLE_EXPLORER: [
    '/businesses',
    '/business/add',
    '/earnings',
  ],
  ROLE_TRAVELER: [
    '/home',
    '/bookings',
    '/view'
  ],
};

/* eslint-disable react/prefer-stateless-function */
export class AppContext extends React.Component {
  makeSureRole() {
    if (
      pathnameToRole[ROLE_OWNER].indexOf(this.props.location.pathname) !== -1
    ) {
      return this.props.dispatch(changeRoleAction(ROLE_OWNER));
    }

    if (
      pathnameToRole[ROLE_TRAVELER].indexOf(this.props.location.pathname) !== -1 || this.props.location.pathname.includes('view')
    ) {
      return this.props.dispatch(changeRoleAction(ROLE_TRAVELER));
    }

    if (
      pathnameToRole[ROLE_EXPLORER].indexOf(this.props.location.pathname) !== -1 || this.props.location.pathname.includes('business')
    ) {
      return this.props.dispatch(changeRoleAction(ROLE_EXPLORER));
    }
  }

  componentDidMount() {
    Bedder.onAppContextDidMount(this.props.dispatch);
    this.makeSureRole();
  }

  render() {
    const theme = this.props.role == ROLE_EXPLORER ? themeExplorer : (this.props.role == ROLE_OWNER ? themeOwner : themeTraveler);

    return (
      <ScrollToTop>
        <UserProvider value={this.props.user}>
          <RoleProvider value={this.props.role}>
            <MuiThemeProvider theme={theme}>
              {this.props.children}
            </MuiThemeProvider>
          </RoleProvider>
        </UserProvider>
      </ScrollToTop>
    );
  }
}

AppContext.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectAppContextUser(),
  role: makeSelectAppContextRole(),
});

const withConnect = connect(
  mapStateToProps,
);

const withReducer = injectReducer({ key: 'appContext', reducer });

export default compose(
  withReducer,
  withConnect,
  withRouter,
)(AppContext);
