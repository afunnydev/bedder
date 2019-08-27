import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withSnackbar } from 'notistack';

import Button from '@material-ui/core/Button';

import SubmitButtonText from 'components/SubmitButtonText';

const ADD_PHONE_MUTATION = gql`
  mutation ADD_PHONE_MUTATION($number: String!) {
    addPhone(number: $number) {
      message
    }
  }
`;

const AddPhoneButton = ({ ownerPhone, handleValidatePhone, enqueueSnackbar }) => (
  <Mutation
    mutation={ADD_PHONE_MUTATION}
    variables={{
      number: ownerPhone,
    }}
    onError={() => enqueueSnackbar('An error occured while adding this phone number. Please contact our support team at info@beddertravel.com.', { variant: 'error' })}
    onCompleted={(data) => handleValidatePhone(data.addPhone.message)}
  >
    {(addPhone, { loading }) => (
      <Button
        variant="contained"
        color="primary"
        onClick={addPhone}
        disabled={loading}
      >
        <SubmitButtonText loading={loading} text="Validate Phone" />
      </Button>
    )}
  </Mutation>
);

AddPhoneButton.propTypes = {
  ownerPhone: PropTypes.string.isRequired,
  handleValidatePhone: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired
};

export default withSnackbar(AddPhoneButton);
