import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withSnackbar } from 'notistack';
import { withRouter } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

import StyledButton from 'components/styles/StyledButton';
import BedderLoadingIndicator from 'components/BedderLoadingIndicator';

import withUserContext from 'containers/AppContext/context';
import DefaultImage from 'assets/images/bedder-default-bg.png';

const CHECKOUT_MUTATION = gql`
  mutation CHECKOUT_MUTATION($businessUnitId: Int!, $to: String!, $from: String!, $numUnitsToBook: Int!, $stripeToken: String!) {
    checkout(businessUnitId: $businessUnitId, to: $to, from: $from, numUnitsToBook: $numUnitsToBook, stripeToken: $stripeToken) {
      id
    }
  }
`;

const CheckoutButton = ({ user, enqueueSnackbar, history, deposit, businessUnitId, name, numUnitsToBook, from, to }) => {
  const onToken = async (stripeRes, checkout) => {
    await checkout({
      variables: {
        stripeToken: stripeRes.id,
      }
    });
  };

  const onCompleted = (data) => {
    if (data && data.checkout && data.checkout.id) {
      enqueueSnackbar('Reservation successful.', { variant: 'success' });
      // TODO: Clear the local state here.
      return history.push(`/booking/${data.checkout.id}`);
    }
    enqueueSnackbar('An error occured while validating your reservation.', { variant: 'error' });
  };

  const onError = () => enqueueSnackbar('An error occured while validating your reservation.', { variant: 'error' });

  return (
    <Mutation
      mutation={CHECKOUT_MUTATION}
      variables={{
        businessUnitId,
        to,
        from,
        numUnitsToBook,
      }}
      onCompleted={onCompleted}
      onError={onError}
    >
      {( checkout, { loading }) => (
        <StripeCheckout
          amount={deposit}
          stripeKey="pk_test_EFeA2DzhJpMgBvupgzZFd0Nl00Kz5vVuyA"
          email={user && user.email}
          token={async stripeRes => await onToken(stripeRes, checkout)}
          image={DefaultImage}
          name="Bedder Travel"
          description={name}
          allowRememberMe={false}
          // TODO: Add more info to checkout.
          // billingAddress={true}
          // zipCode={true}
        >
          <StyledButton
            disabled={loading}
          >
            {loading
              ? <BedderLoadingIndicator white size={20} />
              : `Reserve ${numUnitsToBook} room${numUnitsToBook > 1 ? 's' : ''} now`}
          </StyledButton>
        </StripeCheckout>
      )}
    </Mutation>
  );
};

CheckoutButton.propTypes = {
  user: PropTypes.object,
  enqueueSnackbar: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  businessUnitId: PropTypes.number.isRequired,
  deposit: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  numUnitsToBook: PropTypes.number.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default withRouter(withSnackbar(withUserContext(CheckoutButton)));