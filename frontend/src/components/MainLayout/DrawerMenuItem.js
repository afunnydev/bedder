import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withApollo } from 'react-apollo';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const DrawerMenuItem = ({ to, onClick, children, client }) => {
  const adjustedOnClick = () => {
    // If the routes changes, we should close the menu.
    if (to) client.writeData({ data: { menuOpen: false }});
    if (onClick) return onClick();
  };

  return (
    <ListItem
      button
      component={to ? Link : null}
      to={to}
      style={{ width: 400 }}
      onClick={adjustedOnClick}
    >
      <ListItemText
        primary={children}
        primaryTypographyProps={{ variant: 'body1' }}
      />
    </ListItem>
  );
};

DrawerMenuItem.defaultProps = {
  leaveOpen: false
};

DrawerMenuItem.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  client: PropTypes.object.isRequired,
};

export default withApollo(DrawerMenuItem);