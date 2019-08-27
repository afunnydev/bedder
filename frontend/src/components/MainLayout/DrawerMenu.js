import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';

import { withStyles } from '@material-ui/core/styles';

import { changeRoleAction } from 'containers/AppContext/actions';
import {
  ROLE_EXPLORER,
  ROLE_OWNER,
  ROLE_TRAVELER,
} from 'containers/AppContext/constants';
import WithUserContext, {
  WithRoleContext,
} from 'containers/AppContext/context';

import DrawerDialogFeedback from './DrawerDialogFeedback';
import DrawerMenuItem from './DrawerMenuItem';

import Footer from './Footer';

const styles = {
  wrapper: {
    paddingTop: 0,
    width: 400,
  },
  button: {
    width: 400,
  },
  activeText: {
    fontWeight: 'bold',
  },
};

const DrawerMenuWrapper = props => (
  <List component="nav" style={styles.wrapper}>
    {props.children}
  </List>
);

const DrawerMenu = ({ user, role, dispatch }) => {
  const dispatchRoleExplorer = () => { dispatch(changeRoleAction(ROLE_EXPLORER)); };
  const dispatchRoleTraveler = () => { dispatch(changeRoleAction(ROLE_TRAVELER)); };
  const dispatchRoleOwner = () => { dispatch(changeRoleAction(ROLE_OWNER)); };

  return (
    <DrawerMenuWrapper>
      {user && (
        <React.Fragment>
          {role !== ROLE_TRAVELER ? (
            <React.Fragment>
              <DrawerMenuItem to="/businesses">My Businesses</DrawerMenuItem>
              <DrawerMenuItem to="/earnings">My Earnings</DrawerMenuItem>
              <DrawerMenuItem to="/home" onClick={dispatchRoleTraveler}>
                Traveler&#39;s account
              </DrawerMenuItem>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <DrawerMenuItem to="/home">
                Search Accomodations
              </DrawerMenuItem>
              <DrawerMenuItem to="/bookings">My Bookings</DrawerMenuItem>
              <DrawerMenuItem to="/businesses" onClick={dispatchRoleExplorer}>
                Explorer&#39;s account
              </DrawerMenuItem>
            </React.Fragment>
          )}

          {/* <DrawerMenuItem to="/reservations" active={role == ROLE_OWNER ? true : false} onClick={dispatchRoleOwner}>Hotel / guided owner</DrawerMenuItem> */}

          <Divider />
        </React.Fragment>
      )}

      {/* <ListItem button style={styles.button}> */}
      {/*   <ListItemText */}
      {/*     primary="Currencies" */}
      {/*     primaryTypographyProps={{ variant: 'body1' }} */}
      {/*   /> */}
      {/*   <ListItemSecondaryAction> */}
      {/*     <Button>CAD₴</Button> */}
      {/*   </ListItemSecondaryAction> */}
      {/* </ListItem> */}

      <Divider />
      {!user &&
        <DrawerMenuItem to="/home">Search Accomodations</DrawerMenuItem>}
      <DrawerMenuItem to="/about">About Bedder</DrawerMenuItem>
      <DrawerDialogFeedback component={DrawerMenuItem} text="Feedback" />
      {user && (
        <React.Fragment>
          <DrawerMenuItem to="/profile">My Settings</DrawerMenuItem>

          <Divider />
          <DrawerMenuItem to="/auth/signOut">Log out</DrawerMenuItem>
        </React.Fragment>
      )}

      <Hidden mdUp>
        <Footer />
      </Hidden>
    </DrawerMenuWrapper>
  );
};

export default compose(
  WithUserContext,
  WithRoleContext,
  connect(),
)(withStyles(styles)(DrawerMenu));
