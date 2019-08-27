import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import ViewListIcon from '@material-ui/icons/ViewList';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';

import styles from './HeaderMenuStyles';

const HeaderMenuOwner = ({ user, locationPathname }) => (
  <React.Fragment>
    { user
    &&
    <React.Fragment>
      <Button component={Link} to="/ownerAds" style={(locationPathname === '/ownerAds') ? { ...styles.button, ...styles.activeButton } : styles.button}>
        <ViewListIcon style={styles.icon}></ViewListIcon>
        My Ads
      </Button>
      <Button component={Link} to="/reservations" style={(locationPathname === '/reservations') ? { ...styles.button, ...styles.activeButton } : styles.button}>
        <NotificationImportantIcon style={styles.icon}></NotificationImportantIcon>
        Reservation
      </Button>
    </React.Fragment>
    }
  </React.Fragment>
);

HeaderMenuOwner.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  locationPathname: PropTypes.string.isRequired,
};


export default HeaderMenuOwner;
