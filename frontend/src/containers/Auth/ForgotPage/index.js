import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import StyledButton from 'components/styles/StyledButton';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

import BedderValidator from 'bedder/bedderValidator';
import { Validation } from 'react-validation-framework';

import ErrorNetwork from 'components/ErrorNetwork';
import ErrorResult from 'components/ErrorResult';
import MessageError from 'components/MessageError';

import { Link } from 'react-router-dom';
import {
  changeUsername,
  changePassword,
  changePasswordRepeat,
  changeCode,
  submitForgotAction,
  submitCodeAction,
} from './actions';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectUsername,
  makeSelectPassword,
  makeSelectPasswordRepeat,
  makeSelectCode,
  makeSelectSubmitting,
  makeSelectError,
  makeSelectResult,
  makeSelectSubmittingCode,
  makeSelectErrorCode,
  makeSelectResultCode,
} from './selectors';

const styles = () => ({
  white: {
    color: 'white',
  },
  fieldContainer: {
    marginBottom: '10px',
  },
});

const WhiteText = styled.div`
  color: #fff;
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: 300;
`;

export class ForgotPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { passwordMismatch: false, isValid: true };
    this.submit = this.submit.bind(this);
    this.submitCode = this.submitCode.bind(this);
    this.vRefs = BedderValidator.makeRefs(BedderValidator.getForgotPage());
  }

  submit() {
    if (BedderValidator.validate({ email: this.vRefs.email })) {
      this.props.handleSubmit();
    }
  }

  submitCode() {
    if (this.props.password !== this.props.passwordRepeat) {
      this.setState({ passwordMismatch: true });
      this.setState({ isValid: false });
      // console.log('this.vRefs.password.current', this.vRefs.password.current);
      // this.vRefs.password.current.isValid = false;
      return false;
    }
    this.setState({ isValid: true });
    this.setState({ passwordMismatch: false });
    if (
      BedderValidator.validate({
        code: this.vRefs.code,
        password: this.vRefs.password,
        passwordRepeat: this.vRefs.passwordRepeat,
      })
    ) {
      this.setState({ isValid: true });
      this.props.handleSubmitCode();
    } else {
      this.setState({ isValid: false });
    }
  }

  render() {
    const { classes } = this.props;

    const vs = BedderValidator.getValidators();

    const isPureStart =
      !this.props.result &&
      !this.props.error &&
      !this.props.resultCode &&
      !this.props.errorCode;
    const forgotRequestSuccess =
      (this.props.result &&
        this.props.result.result &&
        this.props.result.result.id > 0) ||
      (this.props.result &&
        this.props.result.error &&
        this.props.result.error.error &&
        this.props.result.error.error == 'CODE_SENT_AGAIN');
    const changePasswordSuccess =
      this.props.resultCode &&
      this.props.resultCode.result &&
      this.props.resultCode.result.id > 0;
    const isResetView = !forgotRequestSuccess && !changePasswordSuccess;

    return (
      <React.Fragment>
        <Helmet>
          <title>Forgot your password ?</title>
        </Helmet>
        <WhiteText>Forgot password</WhiteText>

        {changePasswordSuccess && (
          <Typography>
            <WhiteText>Password changed successfully</WhiteText>
          </Typography>
        )}

        {forgotRequestSuccess &&
          !changePasswordSuccess && (
          <React.Fragment>
            <div className={classes.fieldContainer}>
              <Validation
                componentTag="TextField"
                ref={this.vRefs.code}
                onChangeCallback="onChange"
                validators={[vs.notEmpty]}
              >
                <TextField
                  id="code"
                  label="Enter received code"
                  value={this.props.code}
                  onChange={this.props.onChangeCode}
                  // error={() ? true : false}
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
                ref={this.vRefs.password}
                onChangeCallback="onChange"
                validators={[vs.notEmpty, vs.passwordLength]}
              >
                <TextField
                  id="password"
                  type="password"
                  label="Enter new password"
                  value={this.props.password}
                  onChange={this.props.onChangePassword}
                  // error={() ? true : false}
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
                ref={this.vRefs.passwordRepeat}
                onChangeCallback="onChange"
                validators={[
                  vs.notEmpty,
                  vs.passwordLength,
                  {
                    validator: val => val === this.props.password,
                    errorPropValue: true,
                    errorMessage: 'passwordsMismatch',
                  },
                ]}
              >
                <TextField
                  id="passwordRepeat"
                  label="Repeat new password"
                  type="password"
                  value={this.props.passwordRepeat}
                  error={!!this.state.passwordMismatch}
                  onChange={this.props.onChangePasswordRepeat}
                  // error={() ? true : false}
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
          </React.Fragment>
        )}

        {isResetView && (
          // /////////////////
          <div className={classes.fieldContainer}>
            <Validation
              componentTag="TextField"
              ref={this.vRefs.email}
              onChangeCallback="onChange"
              validators={[vs.isEmail]}
            >
              <TextField
                id="username"
                label="Enter your email address"
                value={this.props.username}
                onChange={this.props.onChangeUsername}
                // error={() ? true : false}
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

          // /////////////////
        )}

        <ErrorNetwork error={this.props.error} />
        {!forgotRequestSuccess && (
          <ErrorResult result={this.props.result} />
        )}

        <ErrorNetwork error={this.props.errorCode} />
        <ErrorResult result={this.props.resultCode} />

        {this.state.passwordMismatch && (
          <MessageError>Passwords mismatch!</MessageError>
        )}

        {this.state.isValid || (
          <MessageError>Please, correct the form!</MessageError>
        )}

        {isResetView && (
          <StyledButton
            type="submit"
            disabled={!!this.props.submitting}
            fullWidth
            onClick={this.submit}
          >
            Request new password
          </StyledButton>
        )}

        {forgotRequestSuccess && !changePasswordSuccess && (
          <StyledButton
            type="submit"
            disabled={!!this.props.submittingCode}
            fullWidth
            onClick={this.submitCode}
          >
            Change password
          </StyledButton>
        )}

        {changePasswordSuccess && (
          <StyledButton component={Link} to="/auth/signIn" fullWidth>
            Sign In Now
          </StyledButton>
        )}
      </React.Fragment>
    );
  }
}

ForgotPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  code: makeSelectCode(),
  password: makeSelectPassword(),
  passwordRepeat: makeSelectPasswordRepeat(),
  submitting: makeSelectSubmitting(),
  error: makeSelectError(),
  result: makeSelectResult(),
  submittingCode: makeSelectSubmittingCode(),
  errorCode: makeSelectErrorCode(),
  resultCode: makeSelectResultCode(),
});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onChangeCode: evt => dispatch(changeCode(evt.target.value)),
    onChangePassword: evt => dispatch(changePassword(evt.target.value)),
    onChangePasswordRepeat: evt =>
      dispatch(changePasswordRepeat(evt.target.value)),
    handleSubmit: () => dispatch(submitForgotAction()),
    handleSubmitCode: () => dispatch(submitCodeAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'forgotPage', reducer });
const withSaga = injectSaga({ key: 'forgotPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(ForgotPage);
