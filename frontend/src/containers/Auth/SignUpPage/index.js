import React from 'react';

import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withSnackbar } from 'notistack';

import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import CircularProgress from '@material-ui/core/CircularProgress';

import StyledButton from 'components/styles/StyledButton';
import MessageError from 'components/MessageError';
import ErrorResult from 'components/ErrorResult';

import BedderValidator from 'bedder/bedderValidator';
import Bedder from 'bedder/bedder';

import ValidationForm from './ValidationForm';
import SignUpForm from './SignUpForm';

const FACEBOOK_SIGNUP_MUTATION = gql`
  mutation FACEBOOK_SIGNUP_MUTATION($payload: String!) {
    facebookSignup(payload: $payload) {
      email
      name
      firstname
      lastname
      roles
      about
      token
    }
  }  
`;

const styles = {
  white: {
    color: 'white',
  },
  fieldContainer: {
    marginBottom: '10px',
  },
};

const AuthIcon = styled(Icon)`
  color: #fff;
`;

export class SignUpPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      withEmail: false,
      hasValidationID: false,
      email: ''
    };
    this.vRefs = BedderValidator.makeRefs(BedderValidator.getSignupPage());
  }

  componentDidMount() {
    if (this.props.match.params.validationID) {
      this.setState({
        hasValidationID: true,
        email: atob(this.props.match.params.validationID)
      });
    }
  }

  responseFacebook = async (response, facebookSignup) => {
    const message = await facebookSignup({
      variables: {
        payload: JSON.stringify(response),
      },
    });
    if (!message.data || !message.data.facebookSignup || !message.data.facebookSignup.token) return false;
    Bedder.setToken(message.data.facebookSignup.token);
    delete message.data.facebookSignup.token;
    Bedder.setUser({
      ...message.data.facebookSignup,
    });
    Bedder.login(this.props.dispatch);
    this.props.enqueueSnackbar(`Welcome to Bedder Travel ${message.data.facebookSignup.firstname}✌️`, { variant: 'default' });
    return this.props.history.push('/home');
  }

  verificationStep = (email) => {
    this.setState({ 
      hasValidationID: true, 
      email 
    });
    this.props.history.push(`/auth/signUp/${btoa(email)}`);
  };

  render() {
    const { classes } = this.props;
    const { hasValidationID } = this.state;

    return (
      <>
        <Helmet>
          <title>Sign up</title>
        </Helmet>
        {!this.state.withEmail && !hasValidationID &&
          <Mutation
            mutation={FACEBOOK_SIGNUP_MUTATION}
          >
            {(facebookSignup, { error, loading }) => (
              <div align="center">
                <FacebookLogin
                  appId="303042963612335"
                  version="3.1"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={response => this.responseFacebook(response, facebookSignup)}
                  render={renderProps => (
                    <StyledButton
                      style={{ marginBottom: 30, minWidth: 50 }}
                      onClick={renderProps.onClick}
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress size={20} classes={{ circle: classes.white }} />) : (
                        <React.Fragment><AuthIcon className="fa fa-facebook" /> Sign Up with Facebook</React.Fragment>)}
                    </StyledButton>
                  )}
                />
                <StyledButton
                  type="button"
                  onClick={() => this.setState({ withEmail: true })}
                  style={{ marginBottom: 30, marginLeft: 10 }}
                >
                  <EmailIcon style={{ marginRight: 10 }} />
                  Sign up with an email
                </StyledButton>
                {error && <MessageError error={error} />}
              </div>
            )}
          </Mutation>}

        {this.props.location.search === '?signUpBeforeContinue' && (
          <ErrorResult error="Sign Up before continue" />
        )}

        {hasValidationID && <ValidationForm email={this.state.email} />}

        {!hasValidationID && this.state.withEmail && <SignUpForm nextStep={this.verificationStep} />}
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withSnackbar,
  withRouter,
  withStyles(styles),
)(SignUpPage);
