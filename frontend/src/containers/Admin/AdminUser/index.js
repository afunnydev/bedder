import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import MessageError from 'components/MessageError';
import Table from 'components/Table';

import adminUserStyle from './adminUserStyle';

const USER_QUERY = gql`
  query USER_QUERY($id: Int!) {
    user(id: $id) {
      id
      email
      firstname
      lastname
      name
      roles
      phone {
        number
        country
      }
      about 
      debit
      credit
      explorerEarning
      bookings {
        id
        amount
        status
        businessUnit {
          id
          name
        }
        business {
          id
          name
        }
        to
        from
      }
      businesses {
        id
        name
        reviewsNum
        reviewsAvg
        bookingsCount
      }
      supportTickets {
        id
        name
        subject
        message
        status
        type
      }
    }
  }
`;

const StyledCard = styled(Card)`
  margin-bottom: 20px;
`;

class AdminUser extends React.Component {
  state = {}
  render() {
    const { classes, match } = this.props;
    return (
      <Query
        query={USER_QUERY}
        variables={{
          id: parseInt(match.params.id),
        }}
      >
        {({ data, loading, error }) => {
          if (error) return <MessageError error={error} />;
          if (loading) return <p>Loading...</p>;
          if (!data || !data.user) return <p>No user found for {match.params.id}</p>;
          const bookingsData = data.user.bookings ? data.user.bookings.map(booking => [
            <Link key={booking.id} to={`/booking/${booking.id}`}>{booking.id}</Link>,
            booking.amount,
            booking.from.date.split(' ')[0],
            booking.to.date.split(' ')[0],
            booking.status === 5 ? 'Approved' : 'Pending',
            <Link key={booking.id} to={`/business/view/${booking.business.id}`}>{booking.business.name}</Link>,
            booking.businessUnit.name,
          ]) : null;
          const businessesData = data.user.businesses ? data.user.businesses.map(business => [
            <Link key={business.id} to={`/business/view/${business.id}`}>{business.id}</Link>,
            business.name,
            business.reviewsAvg,
            business.reviewsNum,
            business.bookingsCount,
          ]) : null;
          const supportTicketsData = data.user.supportTickets ? data.user.supportTickets.map(supportTicket => [
            <Link key={supportTicket.id} to={`/admin/support/${supportTicket.id}`}>{supportTicket.id}</Link>,
            supportTicket.subject,
            supportTicket.message,
            supportTicket.status === 0 ? 'Unanswered' : 'Answered',
            supportTicket.type,
          ]) : null;
          return (
            <React.Fragment>
              <StyledCard>
                <CardContent>
                  <Grid container justify="space-between">
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography variant="h5">Basic Informations</Typography>
                      <ul>
                        <li>ID: {data.user.id}</li>
                        <li>Full name: {data.user.firstname} {data.user.lastname}</li>
                        <li>Email: {data.user.email}</li>
                        <li>Roles: {data.user.roles.join(', ')}</li>
                        <li>Phone: {data.user.phone ? `${data.user.phone.number} in ${data.user.phone.country}`: 'None'}</li>
                        <li>Credits: {data.user.credit}</li>
                        <li>Earning Percentage: {data.user.explorerEarning}%</li>
                      </ul>
                    </Grid>
                  </Grid>
                </CardContent>
              </StyledCard>
              <StyledCard>
                <CardContent>
                  <Grid container justify="space-between">
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography variant="h5">Bookings</Typography>
                      {bookingsData && <Table
                        tableHead={['ID', 'Amount', 'To', 'From', 'Status', 'Accomodation', 'Room']}
                        tableData={bookingsData}
                      />}
                    </Grid>
                  </Grid>
                </CardContent>
              </StyledCard>
              <StyledCard>
                <CardContent>
                  <Grid container justify="space-between">
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography variant="h5">Businesses</Typography>
                      {businessesData && <Table
                        tableHead={['ID', 'Name', 'Review Score', 'Nb of Reviews', 'Nb of Bookings']}
                        tableData={businessesData}
                      />}
                    </Grid>
                  </Grid>
                </CardContent>
              </StyledCard>
              <StyledCard>
                <CardContent>
                  <Grid container justify="space-between">
                    <Grid item xs={12} sm={12} md={12}>
                      <Typography variant="h5">Support Tickets</Typography>
                      {supportTicketsData && <Table
                        tableHead={['ID', 'Subject', 'Message', 'Status', 'Type']}
                        tableData={supportTicketsData}
                      />}
                    </Grid>
                  </Grid>
                </CardContent>
              </StyledCard>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(adminUserStyle)(AdminUser);
