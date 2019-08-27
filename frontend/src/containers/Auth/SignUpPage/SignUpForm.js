import React from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Validation } from 'react-validation-framework';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import WhiteLink from 'components/styles/WhiteLink';
import StyledButton from 'components/styles/StyledButton';
import MessageError from 'components/MessageError';

import BedderValidator from 'bedder/bedderValidator';

const styles = {
  white: {
    color: 'white'
  },
  title: {
    marginBottom: 20
  },
  fieldContainer: {
    marginBottom: '10px',
  },
  error: {
    textAlign: 'left',
    width: '100%',
    color: 'white',
    textDecoration: 'underline',
  },
};

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $password: String!, $firstname: String, $lastname: String) {
    signUp(email: $email, password: $password, firstname: $firstname, lastname: $lastname) {
      id
      email
      name
    }
  }
`;

class SignUpForm extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    nextStep: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    password: '',
    passwordRepeat: '',
    firstname: '',
    lastname: '',
    passwordMismatch: false,
    valid: true,
    sameEmail: false,
  }

  saveToState = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { classes, nextStep } = this.props;
    const {
      email,
      password,
      passwordRepeat,
      firstname,
      lastname,
      sameEmail,
      valid,
      passwordMismatch,
    } = this.state;
    const vs = BedderValidator.getValidators();
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={{
          email,
          password,
          firstname,
          lastname,
        }}
      >
        {(signUp, { loading, error }) => (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (password !== passwordRepeat) {
                return this.setState({ passwordMismatch: true });
              } else if (!firstname || !lastname || !email) {
                return this.setState({ valid: false });
              }
              this.setState({ valid: true });
              this.setState({ passwordMismatch: false });

              // TODO: validate with the validators..

              const res = await signUp();
              if (res && res.data && res.data.signUp && res.data.signUp.id && res.data.signUp.email) {
                this.props.enqueueSnackbar(`You successfully created a new account! We sent an activation code to your ${res.data.signUp.email}.`, { variant: 'success' });
              } else {
                return this.props.enqueueSnackbar('Looks like something went wrong. Please try again later.', { variant: 'error' });
              }
              
              return nextStep(res.data.signUp.email);
            }}
          >
            <Typography variant="h5" classes={{ root: `${classes.white} ${classes.title}`}}>
              Sign up
            </Typography>
            <div className={classes.fieldContainer}>
              <Validation
                componentTag="TextField"
                onChangeCallback="onChange"
                validators={[vs.isEmail]}
              >
                <TextField
                  id="email"
                  label="Enter your email address"
                  name="email"
                  value={email}
                  onChange={this.saveToState}
                  error={sameEmail ? 'A user with that email is already registered.' : null}
                  InputProps={{
                    classes: {
                      root: classes.white,
                      input: classes.white,
                    },
                  }}
                  InputLabelProps={{
                    classes: {
                      root: classes.white,
                    },
                  }}
                  fullWidth
                />
              </Validation>
            </div>

            <div className={classes.fieldContainer}>
              <Validation
                componentTag="TextField"
                group="password"
                onChangeCallback="onChange"
                validators={[vs.notEmpty, vs.passwordLength]}
              >
                <TextField
                  id="password"
                  label="Enter your password"
                  type="password"
                  name="password"
                  onChange={this.saveToState}
                  value={password}
                  InputProps={{
                    classes: {
                      root: classes.white,
                      input: classes.white,
                    },
                  }}
                  InputLabelProps={{
                    className: classes.white,
                  }}
                  fullWidth
                />
              </Validation>
            </div>

            <div className={classes.fieldContainer}>
              <Validation
                componentTag="TextField"
                onChangeCallback="onChange"
                group="password"
                validators={[
                  vs.notEmpty,
                  vs.passwordLength,
                  {
                    validator: val => val === password,
                    errorPropValue: true,
                    errorMessage: 'passwordsMismatch',
                  },
                ]}
              >
                <TextField
                  id="passwordRepeat"
                  label="Repeat your password"
                  type="password"
                  name="passwordRepeat"
                  error={passwordMismatch}
                  onChange={this.saveToState}
                  InputProps={{
                    classes: {
                      root: classes.white,
                      input: classes.white,
                    },
                  }}
                  InputLabelProps={{
                    className: classes.white,
                  }}
                  fullWidth
                />
              </Validation>
            </div>

            <div className={classes.fieldContainer}>
              <Validation
                componentTag="TextField"
                onChangeCallback="onChange"
                validators={[vs.notEmpty]}
              >
                <TextField
                  id="firstname"
                  label="First Name"
                  name="firstname"
                  onChange={this.saveToState}
                  InputProps={{
                    classes: {
                      root: classes.white,
                      input: classes.white,
                    },
                  }}
                  InputLabelProps={{
                    classes: {
                      root: classes.white,
                    },
                  }}
                  fullWidth
                />
              </Validation>
            </div>

            <div className={classes.fieldContainer}>
              <Validation
                componentTag="TextField"
                onChangeCallback="onChange"
                validators={[vs.notEmpty]}
              >
                <TextField
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  onChange={this.saveToState}
                  InputProps={{
                    classes: {
                      root: classes.white,
                      input: classes.white,
                    },
                  }}
                  InputLabelProps={{
                    classes: {
                      root: classes.white,
                    },
                  }}
                  fullWidth
                />
              </Validation>
            </div>

            {passwordMismatch && (
              <MessageError error="The repeated password is different than the password. Please try again." />
            )}

            {!valid && (
              <MessageError error="Please correct all errors in the form." />
            )}

            {error && <MessageError error={error} />}

            <StyledButton
              type="submit"
              disabled={loading}
              fullWidth
            >
              {loading ? (<CircularProgress size={20} classes={{ circle: classes.white }} />) : 'Activate'}
            </StyledButton>
            <WhiteLink to="/auth/signIn">Already have an account?</WhiteLink>
          </form>
        )}
      </Mutation>
    );
  }
}

export default compose(
  withStyles(styles),
  withSnackbar,
)(SignUpForm);
