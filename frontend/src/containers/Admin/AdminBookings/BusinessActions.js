import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withSnackbar } from 'notistack';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { BUSINESSES_QUERY, statusTexts } from './index';

const UPDATE_BUSINESS_STATUS_MUTATION = gql`
  mutation UPDATE_BUSINESS_STATUS_MUTATION($businessId: Int!, $status: Int!) {
    updateBusinessStatus(businessId: $businessId, status: $status) {
      message
    }
  }
`;

const BusinessActions = ({ businessId, status,  enqueueSnackbar }) => (
  <Mutation
    mutation={UPDATE_BUSINESS_STATUS_MUTATION}
    variables={{ businessId }}
    refetchQueries={[{ query: BUSINESSES_QUERY }]}
  >
    {( updateBusinessStatus, { loading }) => (
      // The Select value is not dynamic and it can only change when the Query is refetched.
      <Select
        value={status}
        onChange={async event => {
          let messageObj;
          if (loading) return false;
          try {
            messageObj = await updateBusinessStatus({
              variables: {businessId, status: event.target.value}
            });
          } catch(e) {
            console.log(e);
            return enqueueSnackbar(e.message, { variant: 'error' });
          }
          console.log(messageObj);
          const message = messageObj && messageObj.data && messageObj.data.updateBusinessStatus && messageObj.data.updateBusinessStatus.message;
          if (message) {
            return enqueueSnackbar(message);
          }
          return enqueueSnackbar('Something didn\'t work out', { variant: 'error' });
        }}
      >
        {statusTexts.map((statusText, index) => (
          <MenuItem key={statusText} value={index}>{statusText}</MenuItem>
        ))}
      </Select>
    )}
  </Mutation>
);

BusinessActions.propTypes = {
  businessId: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(BusinessActions);