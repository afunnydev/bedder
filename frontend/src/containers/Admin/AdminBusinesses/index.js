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

import BusinessActions from './BusinessActions';
import adminBusinessesStyle from './adminBusinessesStyle';

const BUSINESSES_QUERY = gql`
  query BUSINESSES_QUERY {
    businesses {
      id
      name
      reviewsNum
      reviewsAvg
      bookingsCount
      status
    }
  }
`;

const statusTexts = [
  'NEW',
  'PENDING OWNER',
  'DRAFT',
  'PENDING',
  'CANCELLED',
  'DECLINED',
  'ACCEPTED',
  'PAUSED',
  'TO MODIFY',
  'LIVE',
];

class AdminBusinesses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return (
      <Query
        query={BUSINESSES_QUERY}
      >
        {({ data, loading, error }) => {
          if (error) return <MessageError error={error} />;
          if (loading) return <p>Loading...</p>;
          let pendingTable = [];
          let businessTable = [];
          if (data && data.businesses.length) {
            data.businesses.map(business => {
              const object = [
                <Link key={business.id} to={`/business/view/${business.id}`}>{business.id}</Link>,
                <Link key={business.id} to={`/business/view/${business.id}`}>{business.name}</Link>, 
                business.reviewsNum, 
                business.reviewsAvg, 
                business.bookingsCount,
                <BusinessActions key={business.id} businessId={business.id} status={business.status} />
              ];
              if (business.status === 3) {
                return pendingTable.push(object);
              }
              return businessTable.push(object);
            });
          }
          const businessTableHead = ['ID', 'Name', 'Nb of Reviews', 'Review', 'Bookings', 'Status'];
          return (
            <Card>
              <CardHeader color="success">
                <h4>Utilisateurs</h4>
              </CardHeader>
              <CardContent>
                <Grid container justify="space-between">
                  <Grid item xs={12} sm={12} md={12}>
                    {pendingTable.length > 0 && <Table
                      tableData={pendingTable}
                      tableHead={businessTableHead}
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
                  <Grid item xs={12} sm={12} md={12}>
                    {businessTable.length > 0  && <Table
                      tableData={businessTable}
                      tableHead={businessTableHead}
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

export default withStyles(adminBusinessesStyle)(AdminBusinesses);
export { BUSINESSES_QUERY, statusTexts };
