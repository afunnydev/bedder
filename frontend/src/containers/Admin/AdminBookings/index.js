import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

import MessageError from 'components/MessageError';
import Table from 'components/Table';

import adminBookingsStyle from './adminBookingsStyle';

const BOOKINGS_QUERY = gql`
  query BOOKINGS_QUERY {
    bookings {
      id
      user {
        id
        email
      }
      business {
        id
        name
      }
      businessUnit {
        id
        name
      }
      amount
      status
    }
  }
`;

// We use the same statuses as businesses, but we don't need them all.
const statusTexts = [
  'PENDING',
  '',
  '',
  '',
  '',
  'REFUSED',
  'ACCEPTED',
];

class AdminBookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return (
      <Query
        query={BOOKINGS_QUERY}
      >
        {({ data, loading, error }) => {
          if (error) return <MessageError error={error} />;
          if (loading) return <p>Loading...</p>;
          const bookingTable = data ? data.bookings.map(booking => [
            <Link key={booking.id} to={`/booking/${booking.id}`}>{booking.id}</Link>, 
            <Link key={booking.id} to={`/admin/user/${booking.user.id}`}>{booking.user.email}</Link>, 
            <Link key={booking.id} to={`/business/view/${booking.business.id}`}>{booking.business.name}</Link>, 
            booking.businessUnit.name,
            booking.amount,
            statusTexts[booking.status],
          ]) : null;
          const bookingTableHead = ['ID', 'User', 'Business', 'Room', 'Amount', 'Status'];
          return (
            <Card>
              <CardHeader color="success">
                <h4>Utilisateurs</h4>
              </CardHeader>
              <CardContent>
                <Grid container justify="space-between">
                  <Grid item xs={12} sm={12} md={12}>
                    {bookingTable.length > 0  && <Table
                      tableData={bookingTable}
                      tableHead={bookingTableHead}
                      customCellClasses={[
                        classes.center,
                      ]}
                      customClassesForCells={[6]}
                      customHeadCellClasses={[
                        classes.center,
                      ]}
                      customHeadClassesForCells={[6]}
                    />}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(adminBookingsStyle)(AdminBookings);
export { BOOKINGS_QUERY };
