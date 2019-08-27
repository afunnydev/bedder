import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withSnackbar } from 'notistack';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import SubmitButtonText from 'components/SubmitButtonText';
import formatApolloError from 'utils/formatApolloError';

const VERIFY_PHONE_MUTATION = gql`
  mutation VERIFY_PHONE_MUTATION($code: String!, $number: String!) {
    verifyPhone(code: $code, number: $number) {
      message
    }
  }
`;

const VerfiyPhoneButton = ({ verificationCode, saveToState, ownerPhone, handleVerifyPhone, enqueueSnackbar }) => (
  <Mutation
    mutation={VERIFY_PHONE_MUTATION}
    variables={{
      code: verificationCode,
      number: ownerPhone,
    }}
    onError={(error) => enqueueSnackbar(formatApolloError(error), { variant: 'error' })}
    onCompleted={(data) => handleVerifyPhone(data.verifyPhone.message)}
  >
    {(verifyPhone, { loading }) => (
      <React.Fragment>
        <TextField
          fullWidth
          label="Enter your verification code"
          id="verificationCode"
          name="verificationCode"
          value={verificationCode}
          onChange={saveToState}
          InputLabelProps={{
            shrink: true,
          }}
          helperText={`We sent a verification code to ${ownerPhone}`}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={verifyPhone}
          disabled={loading}
          style={{ marginTop: 20 }}
        >
          <SubmitButtonText loading={loading} text="Validate" />
        </Button>
      </React.Fragment>
    )}
  </Mutation>
);

VerfiyPhoneButton.propTypes = {
  verificationCode: PropTypes.string.isRequired,
  saveToState: PropTypes.func.isRequired,
  ownerPhone: PropTypes.string.isRequired,
  handleVerifyPhone: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(VerfiyPhoneButton);
