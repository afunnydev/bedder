import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import ReceiptIcon from '@material-ui/icons/Receipt';
import PersonIcon from '@material-ui/icons/Person';

import styles from './HeaderMenuStyles';

const HeaderMenuTraveler = ({ user, locationPathname }) => (
  <React.Fragment>
    { user
      ? <React.Fragment>
        <Button component={Link} to="/bookings" style={(locationPathname === '/bookings') ? { ...styles.button, ...styles.activeButton } : styles.button}>
          <ReceiptIcon style={styles.icon}></ReceiptIcon>
          My Reservations
        </Button>
      </React.Fragment>
      : <React.Fragment>
        <Button component={Link} to="/auth/signIn" style={styles.button}>
          <PersonIcon style={styles.icon}></PersonIcon>
          Sign In
        </Button>
      </React.Fragment>
    }

    {/* <Button style={{...styles.button, ...styles.buttonSeparator}} disabled >|</Button> */}
    {/* <Button style={styles.button}> */}
    {/*   CAD₴ */}
    {/* </Button> */}
  </React.Fragment>
);

HeaderMenuTraveler.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  locationPathname: PropTypes.string.isRequired,
};

export default HeaderMenuTraveler;
