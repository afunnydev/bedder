import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import Edit from '@material-ui/icons/Edit';

import MessageError from 'components/MessageError';
import Table from 'components/Table';

import BlockUserButton from './BlockUserButton';
import adminUsersStyle from './adminUsersStyle';

const USERS_QUERY = gql`
  query USERS_QUERY {
    users {
      id
      email
      firstname
      lastname
      isBlocked
    }
  }
`;

class AdminUsers extends React.Component {
  state = {}
  render() {
    const { classes } = this.props;
    const actionButtons = (id, isBlocked) => (
      [
        <Button
          key={1}
          color="primary"
          onClick={() => this.props.history.push(`/admin/user/${id}`)}
        >
          <Edit className={classes.icon} />
        </Button>,
        <BlockUserButton key={2} userId={id} isBlocked={isBlocked} classes={classes} />
      ]
    );
    return (
      <Query
        query={USERS_QUERY}
      >
        {({ data, loading, error }) => {
          if (error) return <MessageError error={error} />;
          if (loading) return <p>Loading...</p>;
          const userTable = data ? data.users.map(user => [user.id, user.email, user.firstname, user.lastname, actionButtons(user.id, user.isBlocked)]) : null;
          const userTableHead = ['ID', 'Email', 'First name', 'Last name', 'Actions'];
          return (
            <Card>
              <CardHeader color="success">
                <h4>Utilisateurs</h4>
              </CardHeader>
              <CardContent>
                <Grid container justify="space-between">
                  <Grid item xs={12} sm={12} md={12}>
                    {userTable && <Table
                      tableData={userTable}
                      tableHead={userTableHead}
                      customCellClasses={[
                        classes.center,
                      ]}
                      customClassesForCells={[4]}
                      customHeadCellClasses={[
                        classes.center,
                      ]}
                      customHeadClassesForCells={[4]}
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

export default withStyles(adminUsersStyle)(AdminUsers);
export { USERS_QUERY };
