import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';

import DrawerHeader from './DrawerHeader';
import DrawerMenu from './DrawerMenu';

const LeftDrawer = (props) => {
  const { navDrawerOpen, closeFn, userRole } = props;

  const styles = {
    drawerPaper: {
      paddingTop: 64,
    },
    drawerBackdrop: {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
  };

  return (
    <Drawer
      PaperProps={{ style: styles.drawerPaper }}
      BackdropProps={{ style: styles.drawerBackdrop }}
      onClose={() => closeFn(false)}
      open={navDrawerOpen}
    >
      <DrawerHeader userRole={userRole} />
      <DrawerMenu />
    </Drawer>
  );
};

LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  closeFn: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
};

export default LeftDrawer;
