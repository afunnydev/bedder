import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withSnackbar } from 'notistack';
import { fieldValidatorCore } from 'react-validation-framework';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { BUSINESS_QUERY } from './index.js';

const UPDATE_BUSINESS_MUTATION = gql`
  mutation UPDATE_BUSINESS_MUTATION($business: BusinessUpdateInput!) {
    updateBusiness(business: $business) {
      message
    }
  }
`;

const SubmitButtons = ({ id, client, status, enqueueSnackbar, history }) => {
  // TODO: We should adjust the error message based on what the backend gave us.
  const onError = () => enqueueSnackbar('Something went wrong. Please make sure you filled at least the address before saving.', { variant: 'error' });
  const onCompleted = () => {
    enqueueSnackbar('Saved ✌️', { variant: 'success' });
  };
  // This fn should be split into multiple fn if possible. When you have time :)
  const sendNewInfo = async (updateFn, newStatus = 'draft') => {
    // Check all fields, except the address. We don't have access to it easily via fieldValidatorCore. We will check it down there.
    if (newStatus == 'public') {
      // We could tell the number of errors by checking checkGroup.inValidComponents
      if (!fieldValidatorCore.checkGroup('generalInformation').isValid) return enqueueSnackbar('Please make sure you filled all the required fields before submitting your business to go live.', { variant: 'error' });
    }

    const query = await client.readQuery({
      query: BUSINESS_QUERY,
      variables: {
        businessId: id
      }
    });

    const business = Object.assign({}, query.business);
    const address = Object.assign({}, business.address);

    if (!address || !address.address || parseFloat(address.lat) == 0 || parseFloat(address.lon) == 0) {
      return enqueueSnackbar('You need to choose at least an address before saving this business.', { variant: 'error' });
    } 
    
    if (newStatus == 'public') {
      if (business.units && business.units.length) {
        for (let i = 0; i < business.units.length; i++) {
          // Currently, this is not validating if the room as at least 1 bed.
          if (!fieldValidatorCore.checkGroup(`room-${business.units[i].id}`).isValid) return enqueueSnackbar(`Please make sure you filled all the required fields for room "${business.units[i].name}" before submitting your business to go live.`, { variant: 'error' });
        }
      } else {
        return enqueueSnackbar('You need at least one room before submitting your business to go live.', { variant: 'error' });
      }
    }

    const coverPhotos = JSON.stringify(business.coverPhotos);
    const businessUnits = JSON.stringify(business.units);
    delete business.address;
    delete business.coverPhotos;
    delete business.units;
    delete business.__typename;
    delete address.id;
    delete address.__typename;

    // The try/catch block is not particularly necessary, since it's handled by the mutation. Could be added if necessary.
    const res = await updateFn({
      variables: {
        business: {
          ...business,
          ...address,
          coverPhotos,
          businessUnits,
          status: newStatus
        }
      }
    });
    if (newStatus === 'public' && res && res.data && res.data.updateBusiness) return history.push('/business/add/success');
  };

  return (
    <Grid container spacing={2} style={{ marginTop: 30 }}>
      <Grid item xs={12} md={3} style={{ paddingRight: 30 }} />
      <Grid item xs={12} sm={9}>
        <Mutation
          mutation={UPDATE_BUSINESS_MUTATION}
          variables={{
            id
          }}
          refetchQueries={[{ query: BUSINESS_QUERY, variables: { businessId: id } }]}
          onCompleted={onCompleted}
          onError={onError}
        >
          {( updateBusiness, {loading}) => (
            <>
              <Button
                disabled={loading}
                variant="contained"
                color="primary"
                onClick={() => sendNewInfo(updateBusiness)}
                style={{
                  padding: '10px 50px',
                  fontSize: 16,
                  textTransform: 'none',
                  marginBottom: 20,
                  marginRight: 20,
                }}
              >
                Save Changes
              </Button>
              {status <= 3
                ? <Button
                  disabled={status === 3 || loading}
                  variant="contained"
                  color="primary"
                  onClick={() => sendNewInfo(updateBusiness, 'public')}
                  style={{
                    padding: '10px 50px',
                    fontSize: 16,
                    textTransform: 'none',
                    marginBottom: 20,
                    background: 'linear-gradient(90deg, rgb(141, 64, 65) 0%, rgb(75, 65, 140) 100%)',
                  }}
                >
                  { status === 3 ? 'In Review' : 'Submit for Review' }
                </Button>
                : null}
            </>
          )}
        </Mutation>
      </Grid>
    </Grid>
  );
};

SubmitButtons.propTypes = {
  client: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withSnackbar(SubmitButtons));