import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Button from '@material-ui/core/Button';

import MessageError from 'components/MessageError';
import SubmitButtonText from 'components/SubmitButtonText';

const ADD_BUSINESS_MUTATION = gql`
  mutation ADD_BUSINESS_MUTATION($name: String!, $ownerEmail: String!, $ownerPhone: String) {
    addBusiness(name: $name, ownerEmail: $ownerEmail, ownerPhone: $ownerPhone) {
      id
      name
      status
    }
  }
`;

const AddBusinessButton = ({ name, ownerEmail, ownerPhone, handleSubmit }) => (
  <Mutation
    mutation={ADD_BUSINESS_MUTATION}
    variables={{
      name,
      ownerEmail,
      ownerPhone,
    }}
  >
    {(addBusiness, { error, loading }) => (
      <React.Fragment>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSubmit(addBusiness)}
          disabled={loading}
        >
          <SubmitButtonText loading={loading} text="Create accomodation" />
        </Button>
        {error && <MessageError error={error} />}
      </React.Fragment>
    )}
  </Mutation>
);

AddBusinessButton.propTypes = {
  name: PropTypes.string.isRequired,
  ownerEmail: PropTypes.string.isRequired,
  ownerPhone: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default AddBusinessButton;
