import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import AdminUsers from 'containers/Admin/AdminUsers/Loadable';
import AdminUser from 'containers/Admin/AdminUser/Loadable';
import AdminBusinesses from 'containers/Admin/AdminBusinesses/Loadable';
import AdminContent from 'containers/Admin/AdminContent/Loadable';
import AdminBookings from 'containers/Admin/AdminBookings/Loadable';

import BackButton from 'components/BackButton';

const PartialGrid = styled(Grid)`
  max-width: 1000px;
  margin: auto;
  padding-top: 40px;
`;

const FloatBackButton = styled(BackButton)`
  float: left;
`;

const BigPaper = styled(Paper)`
  height: 100px;
  padding-top: 40px;
  text-align: center;
`;

const Routes = () => (
  <Grid container spacing={2} direction="row" style={{ marginTop: 20 }}>
    <Grid item xs={12} md={4}>
      <BigPaper elevation={3}>
        <Link to="/admin/bookings">All Bookings</Link>
      </BigPaper>
    </Grid>
    <Grid item xs={12} md={4}>
      <BigPaper elevation={3}>
        <Link to="/admin/businesses">All Businesses</Link>
      </BigPaper>
    </Grid>
    <Grid item xs={12} md={4}>
      <BigPaper elevation={3}>
        <Link to="/admin/users">All Users</Link>
      </BigPaper>
    </Grid>
    <Grid item xs={12} md={4}>
      <BigPaper elevation={3}>
        <Link to="/admin/content">Content</Link>
      </BigPaper>
    </Grid>
    <Grid item xs={12} md={4}>
      <BigPaper elevation={3}>
        <a href="https://beddertravel.freshdesk.com/a/dashboard/sample" target="_blank" rel="noopener noreferrer">Freshdesk</a>
      </BigPaper>
    </Grid>
    <Grid item xs={12} md={4}>
      <BigPaper elevation={3}>
        <a href="https://dashboard.stripe.com" target="_blank" rel="noopener noreferrer">Stripe</a>
      </BigPaper>
    </Grid>
  </Grid>
);

const Admin = () => (
  <React.Fragment>
    <Helmet>
      <title>Admin</title>
    </Helmet>
    <PartialGrid container direction="row">
      <Grid item xs={12} style={{ marginBottom: 20 }}>
        <FloatBackButton />
        <Typography variant="h4" align="center">Admin</Typography>
      </Grid>
      <Grid item xs={12}>
        <Switch>
          <Route path="/admin/users" component={AdminUsers} />
          <Route path="/admin/user/:id" component={AdminUser} />
          <Route path="/admin/businesses" component={AdminBusinesses} />
          <Route path="/admin/content" component={AdminContent} />
          <Route path="/admin/bookings" component={AdminBookings} />
          <Route path="/admin" component={Routes} />
        </Switch>
      </Grid>
    </PartialGrid>
  </React.Fragment>
);

export default Admin;
