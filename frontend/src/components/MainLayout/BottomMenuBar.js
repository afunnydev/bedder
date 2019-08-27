import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Hidden from '@material-ui/core/Hidden';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import {
  ROLE_OWNER,
  ROLE_TRAVELER,
} from 'containers/AppContext/constants';

const BottomMenuBar = ({ userRole }) => (
  <Hidden mdUp>
    <BottomNavigation
      // We could use the value prop to tell which BottomNavigationAction is active. https://material-ui.com/api/bottom-navigation/
      // value={1}
      showLabels
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        zIndex: 1301,
      }}
    >
      {userRole === ROLE_TRAVELER
        ? [
          <BottomNavigationAction
            key="search"
            component={Link}
            to="/home"
            label="Search"
            icon={
              <span style={{ minHeight: 20 }} className="icon-search" />
            }
          />,
          <BottomNavigationAction
            key="bookings"
            component={Link}
            to="/bookings"
            label="Reservation"
            icon={
              <span
                style={{ minHeight: 20 }}
                className="icon-reservation"
              />
            }
          />
        ]
        : userRole === ROLE_OWNER
          ? [
            <BottomNavigationAction
              key="owner-ads"
              value={0}
              component={Link}
              to="/ownerAds"
              label="My Ads"
              icon={<span style={{ minHeight: 20 }} className="icon-ads" />}
            />,
            <BottomNavigationAction
              key="owner-reservations"
              value={5}
              component={Link}
              to="/reservations"
              label="Reservation"
              icon={
                <span
                  style={{ minHeight: 20 }}
                  className="icon-reservation"
                />
              }
            />
          ]
          : [
            <BottomNavigationAction
              key="businesses"
              component={Link}
              to="/businesses"
              label="My Pages"
              icon={<span style={{ minHeight: 20 }} className="icon-ads" />}
            />,
            <BottomNavigationAction
              key="earnings"
              component={Link}
              to="/earnings"
              label="Earnings"
              icon={<span style={{ minHeight: 20 }} className="icon-gains" />}
            />,
            <BottomNavigationAction
              key="businesses-add"
              component={Link}
              to="/business/add"
              label="Add"
              icon={<span style={{ minHeight: 20 }} className="icon-new" />}
            />
          ]}
    </BottomNavigation>
  </Hidden>
);

BottomMenuBar.propTypes = {
  userRole: PropTypes.string
};

export default BottomMenuBar;