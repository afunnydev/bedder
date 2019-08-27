import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import Bedder from 'bedder/bedder';

import StyledButton from 'components/styles/StyledButton';
import MessageError from 'components/MessageError';

const styles = {
  white: {
    color: 'white',
  },
  fieldContainer: {
    marginBottom: '10px',
  },
};

const VALIDATE_ACCOUNT_MUTATION = gql`
  mutation VALIDATE_ACCOUNT_MUTATION($email: String!, $code: String!) {
    validateAccount(email: $email, code: $code) {
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

class ValidationForm extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired,
  }

  state = {
    code: '',
    valid: true,
  }

  saveToState = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { classes, email } = this.props;
    const { code } = this.state;
    return (
      <Mutation
        mutation={VALIDATE_ACCOUNT_MUTATION}
        variables={{
          email,
          code,
        }}
      >
        {(validateAccount, { loading, error }) => (
          <form
            onSubmit={async e => {
              e.preventDefault();
              if (!code) {
                this.setState({ valid: false });
                return false;
              }
              this.setState({ valid: true });
              const user = await validateAccount();

              if (!user.data || !user.data.validateAccount || !user.data.validateAccount.token) return this.props.enqueueSnackbar('Are you sure this is your activation code? 🧐', { variant: 'error' });
              
              Bedder.setToken(user.data.validateAccount.token);
              delete user.data.validateAccount.token;
              Bedder.setUser({
                ...user.data.validateAccount,
              });
              Bedder.login(this.props.dispatch);
              this.props.enqueueSnackbar('Your account is now activated! 🔆', { variant: 'success' });
              return this.props.history.push('/home');
            }}
          >
            <Typography className={classes.white} variant="subheading">
              We sent an activation code to the provided email address.
              Please, enter it below.
            </Typography>
            <div className={classes.fieldContainer}>
              <TextField
                id="code"
                label="Enter activation code"
                onChange={this.saveToState}
                name="code"
                required
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
            </div>
            {error && <MessageError error={error} />}
            <StyledButton
              type="submit"
              disabled={loading}
              fullWidth
            >
              {loading ? (<CircularProgress size={20} classes={{ circle: classes.white }} />) : 'Activate'}
            </StyledButton>
          </form>
        )}
      </Mutation>
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
  withRouter,
  withConnect,
  withStyles(styles),
  withSnackbar,
)(ValidationForm);
