import React from 'react';
import PropTypes from 'prop-types';

import WithUserContext from 'containers/AppContext/context';

import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { ROLE_EXPLORER, ROLE_OWNER, ROLE_TRAVELER } from 'containers/AppContext/constants';

import HeaderMenuTraveler from './HeaderMenuTraveler';
import HeaderMenuExplorer from './HeaderMenuExplorer';
import HeaderMenuOwner from './HeaderMenuOwner';

const HeaderMenu = ({ userRole, locationPathname, user }) => (
  <React.Fragment>
    {userRole === ROLE_OWNER && <HeaderMenuOwner user={user} userRole={userRole} locationPathname={locationPathname} />}
    {userRole === ROLE_TRAVELER && <HeaderMenuTraveler user={user} userRole={userRole} locationPathname={locationPathname} />}
    {userRole === ROLE_EXPLORER && <HeaderMenuExplorer user={user} userRole={userRole} locationPathname={locationPathname} />}
  </React.Fragment>
);

HeaderMenu.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  userRole: PropTypes.string.isRequired,
  locationPathname: PropTypes.string.isRequired,
};

export default compose(WithUserContext, withRouter)(HeaderMenu);
