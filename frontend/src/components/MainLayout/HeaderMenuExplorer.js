import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import styles from './HeaderMenuStyles';

const HeaderMenuExplorer = ({ user, locationPathname }) => (
  <React.Fragment>
    { user
    &&
    <React.Fragment>
      <Button component={Link} to="/businesses" style={(locationPathname === '/businesses') ? { ...styles.button, ...styles.activeButton } : styles.button}>
        <span style={styles.icon} className="icon-ads"></span>
        My Pages
      </Button>
      <Button component={Link} to="/earnings" style={(locationPathname === '/earnings') ? { ...styles.button, ...styles.activeButton } : styles.button}>
        <span style={styles.icon} className="icon-gains"></span>
        My Earnings
      </Button>
    </React.Fragment>
    }

    <Button style={{ ...styles.button, ...styles.buttonSeparator }} disabled >|</Button>
    <Button component={Link} to="/business/add" style={(locationPathname === '/business/add') ? { ...styles.addButton, ...styles.button, ...styles.activeButton } : { ...styles.button, ...styles.addButton }}>
      Add
      <span style={styles.addButtonIcon} className="icon-new"></span>
    </Button>
  </React.Fragment>
);

HeaderMenuExplorer.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  locationPathname: PropTypes.string.isRequired,
};

export default HeaderMenuExplorer;
