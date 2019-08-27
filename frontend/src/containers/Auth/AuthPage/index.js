/**
 *
 * AuthPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import BedderLoadingIndicator from 'components/BedderLoadingIndicator';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import Bedder from 'bedder/bedder';

import MessageError from 'components/MessageError';
import RedirectTo from 'components/RedirectTo';

import makeSelectAuthPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import AuthPagePropainer, { withConnect as withPropainerConnect } from './AuthPagePropainer';

const styles = () => ({
  root: {
    flexGrow: 1,
    height: '100vh',
  },
  buttonsContainer: {
    textAlign: 'center',
  },
});

const AuthIcon = styled(Icon)`
  color: #fff;
`;

const WhiteText = styled.div`
  color: #fff;
  padding-top: 16px;
  padding-bottom: 16px;
  font-size: 16pt;
`;

const WhiteA = styled.div`
  text-decoration: underline;
  color: #fff;
  padding-top: 16px;
  padding-bottom: 16px;
  display: block;
  font-size: 14pt;
  & > A {
    color: #fff;
  }
`;

const StyledCard = styled(Card)`
  background: linear-gradient(90deg, #4b418c 0%, #8d4041 100%);
`;

const StyledCardContent = styled(CardContent)`
  padding-bottom: 6px !important;
  padding-top: 6px !important;
`;

/* eslint-disable react/prefer-stateless-function */
export class AuthPage extends React.Component {
  constructor(props) {
    super(props);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  responseFacebook(response) {
    this.props.onChangeFacebookOauthResult(response);
    this.props.submitFacebook();
  }

  login() {
    Bedder.setToken(this.props.facebookResult.token);
    Bedder.setUser(this.props.facebookResult.user);
    Bedder.login(this.props.dispatch);
    this.props.history.push('/home');
  }

  componentDidUpdate(prevProps) {
    if(prevProps.facebookResult != this.props.facebookResult && this.props.facebookResult && this.props.facebookResult.token) {
      this.login();
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <AuthPagePropainer />
        { this.props.facebookResult && this.props.facebookResult.result && this.props.facebookResult.result === 'not_registered' && (
          <React.Fragment>
            <MessageError error="User is not found. Please, sign up first."></MessageError>
            <RedirectTo push delay="1500" to="/auth/signUp" />
          </React.Fragment>

        ) }
        <WhiteText>Hello! Sign in with:</WhiteText>
        <StyledCard>
          <StyledCardContent>
            <Grid
              container
              className={classes.buttonsContainer}
              spacing={2}
              alignItems="center"
              alignContent="center"
              direction="row"
              justify="center"
            >
              <Grid item xs={6}>

                {this.props.facebookSubmitting || (
                  <FacebookLogin
                    appId="303042963612335"
                    version="3.1"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={this.responseFacebook}
                    render={renderProps => (
                      <IconButton onClick={renderProps.onClick}>
                        <AuthIcon className="fa fa-facebook" />
                      </IconButton>
                    )}
                  />
                )}

                {this.props.facebookSubmitting && (
                  <BedderLoadingIndicator white />
                )}


              </Grid>
              <Grid item xs={6}>
                <IconButton component={Link} to="/auth/signIn">
                  <AuthIcon className="fa fa-at" />
                </IconButton>
              </Grid>
            </Grid>
          </StyledCardContent>
        </StyledCard>
        <WhiteA><Link to="/auth/signUp">Don't have an account? Sign up here.</Link></WhiteA>
      </React.Fragment>
    );
  }
}

AuthPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authpage: makeSelectAuthPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'authPage', reducer });
const withSaga = injectSaga({ key: 'authPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withPropainerConnect,
  withStyles(styles)
)(AuthPage);
