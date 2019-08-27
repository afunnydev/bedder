import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import MenuIcon from '@material-ui/icons/Menu';

import WhiteLogo from 'components/LogoImage/bedder_white.png';
import HeaderMenu from './HeaderMenu';

const StyledWhiteLogo = styled.img`
  width: 132px;
`;

const StyledWhiteLogoWrapper = styled.div`
  flex: 1;
  text-align: center;
`;

const Header = (props) => {
  const {
    toggleMenu,
    userRole,
    location,
  } = props;

  const roleBgTraveler = 'linear-gradient(90deg, #4b418c 0%, #8d4041 100%)';
  const roleBgExplorer = 'linear-gradient(90deg, #8d4041 0%, #4b418c 100%)';
  const roleBgOwner = 'linear-gradient(90deg, #000 0%, #000 100%)';

  const backgroundStr =
    userRole === 'ROLE_EXPLORER'
      ? roleBgExplorer
      : userRole === 'ROLE_TRAVELER'
        ? roleBgTraveler
        : roleBgOwner;

  const menuStr =
    userRole === 'ROLE_EXPLORER'
      ? 'EXPLORER'
      : userRole === 'ROLE_TRAVELER'
        ? 'TRAVELER'
        : 'OWNER';

  const style = {
    appBar: {
      position: 'fixed',
      top: 0,
      overflow: 'hidden',
      zIndex: 1301,
      maxHeight: 64,
      background: backgroundStr,
    },
    menuButton: {
      marginLeft: 10,
      color: '#fff',
      width: 'inherit',
      fontSize: '1rem',
      backgroundColor: 'transparent',
    },
    iconsRightContainer: {
      marginLeft: 20,
    },
    toolBar: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    rightCell: {
      textAlign: 'right',
      paddingRight: 10,
    },
  };

  return (
    <React.Fragment>
      <AppBar
        style={style.appBar}
      >
        <Toolbar style={style.toolBar}>
          <Grid
            container
            spacing={0}
            alignItems="center"
            direction="row"
            justify="center"
            alignContent="center"
          >
            <Grid item xs={3} sm={5} style={{ paddingLeft: 10 }}>
              <IconButton
                style={style.menuButton}
                onClick={toggleMenu}
                disableRipple
              >
                <MenuIcon style={{ marginRight: 10 }} />
                <Hidden smDown>{menuStr}</Hidden>
              </IconButton>
            </Grid>
            <Grid item xs={6} sm={2}>
              <StyledWhiteLogoWrapper>
                <Button component={Link} to="/home">
                  <StyledWhiteLogo src={WhiteLogo} />
                </Button>
              </StyledWhiteLogoWrapper>

            </Grid>
            <Hidden mdUp>
              <Grid item xs={3} sm={5} style={style.rightCell}></Grid>
            </Hidden>
            <Hidden smDown>
              <Grid item xs={3} sm={5} style={style.rightCell}>
                <HeaderMenu userRole={userRole} locationPathname={location.pathname} />
              </Grid>
            </Hidden>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

Header.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(Header);
