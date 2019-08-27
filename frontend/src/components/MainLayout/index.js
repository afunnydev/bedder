import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import styled from 'styled-components';
import { Query, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import withWidth from '@material-ui/core/withWidth';
import Icon from '@material-ui/core/Icon';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Hidden from '@material-ui/core/Hidden';

import { WithRoleContext } from 'containers/AppContext/context';

import Header from './Header';
import LeftDrawer from './LeftDrawer';
import Footer from './Footer';
import BottomMenuBar from './BottomMenuBar';

const MainContainer = styled.div`
  min-height: calc(100vh - 300px);
  margin-top: ${props => props.width === 'xs' ? '56px' : '64px'};
  ${props => props.width === 'xs' || props.width === 'sm'
    ? 'padding-bottom: 56px;'
    : ''}
  @media (max-width:  863px) {
    min-height: inherit;
  }
`;

const UTILS_DATA_QUERY = gql`
  {
    menuOpen @client
  }
`;

const MainLayout = ({ role, width, client, children}) => {
  const toggleMenu = (state) => client.writeData({ data: { menuOpen: state } });

  return (
    <Query query={UTILS_DATA_QUERY}>
      {({ data: { menuOpen } }) => (
        <>
          <Header
            userRole={role}
            toggleMenu={() => toggleMenu(!menuOpen)}
          />

          <LeftDrawer
            closeFn={toggleMenu}
            navDrawerOpen={menuOpen}
            userRole={role}
            menus={[
              {
                text: 'DashBoard',
                icon: <Icon className="fa fa-list" />,
                link: '/dashboard',
              },
            ]}
            username="User Admin"
          />

          <MainContainer width={width}>{children}</MainContainer>

          <BottomMenuBar userRole={role} />

          <Hidden smDown>
            <Footer />
          </Hidden>
        </>
      )}
    </Query>
  );
};

MainLayout.propTypes = {
  role: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  client: PropTypes.object.isRequired,
};

export default compose(
  WithRoleContext,
  withMobileDialog(),
  withWidth(),
  withApollo,
)(MainLayout);
