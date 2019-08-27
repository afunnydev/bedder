import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

import CheckoutButton from 'components/CheckoutButton';
import formatDate from 'utils/formatDate';

const Heading = styled.p`
  font-weight: 700;
  font-style: italic;
  margin-bottom: 7px;
`;

const BOOKING_INFO_QUERY = gql`
  {
    bookingStartDate @client
    bookingEndDate @client
    bookingNumBeds @client
    bookingNumPeople @client
    numUnitsToBook @client
    businessUnitToBook @client {
      id
      name
      quote
      deposit
      toPayThere
      acceptAutomatically
      currency
    }
  }
`;

const BookingDialog = ({ open, setDialogOpen }) => (
  <Dialog
    fullWidth
    maxWidth="md"
    open={open}
    onClose={() => setDialogOpen(false)}
    aria-labelledby="max-width-dialog-title"
  >
    <Query
      query={BOOKING_INFO_QUERY}
    >
      {({ data }) => {
        const bookingFrom = new Date(data.bookingStartDate);
        const bookingTo = new Date(data.bookingEndDate);
        const { bookingNumPeople, numUnitsToBook, businessUnitToBook } = data;
        const { id, name, quote, deposit, toPayThere, acceptAutomatically, currency } = businessUnitToBook;
        return (
          <>
            <DialogTitle id="max-width-dialog-title">
              Reservation Request
              <IconButton 
                aria-label="Close" 
                onClick={() => setDialogOpen(false)}
                style={{ position: 'absolute', right: '5px', top: '5px', color: 'rgba(0, 0, 0, 0.54)'}}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Heading>Date</Heading>
                  <Typography variant="body1">
                    {formatDate(bookingFrom)} to {formatDate(bookingTo)}
                  </Typography>
                  <Typography variant="body2" style={{ marginTop: 7 }}>
                    This reservation is for {bookingNumPeople} person{bookingNumPeople > 1 ? 's' : ''}.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Heading>Total cost of the reservation</Heading>
                  <Typography variant="body1">
                    {(quote * numUnitsToBook / 100).toFixed(2)} USD
                  </Typography>
                  <Heading>Total to pay now</Heading>
                  <Typography variant="body1">
                    {(deposit * numUnitsToBook / 100).toFixed(2)} USD
                  </Typography>
                  <Heading>Payable at the accomodation</Heading>
                  <Typography variant="body1">
                    {(toPayThere * numUnitsToBook).toFixed(2)} {currency}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Heading>Confirmation</Heading>
                  <Typography variant="body2">
                    Note that this accomodation {acceptAutomatically === 1 ? 
                      'accepts bookings automatically. In case anything would change, you will be contacted by email.' :
                      'doesn\'t accept booking automatically. Once the reservation request is made, we will follow up with you quickly to let you know the status.'}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <CheckoutButton
                deposit={deposit * numUnitsToBook}
                businessUnitId={id}
                name={name}
                numUnitsToBook={numUnitsToBook}
                from={data.bookingStartDate}
                to={data.bookingEndDate}
              />
            </DialogActions>
          </>
        );
      }}
    </Query>
  </Dialog>
);

BookingDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setDialogOpen: PropTypes.func.isRequired,
};

export default BookingDialog;