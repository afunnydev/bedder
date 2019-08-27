import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import BedderConfig from 'bedder/bedderConfig';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { Link } from 'react-router-dom';

const WhiteA = styled.ul`
  padding: 0;
  list-style-type: none;
  a {
    color: #fff;
    text-decoration: none;
  }
`;

const IconA = styled.ul`
  padding: 0;
  list-style-type: none;
  li {
    display: inline-block;
    margin-right: 10px;
  }
  span {
    color: #fff;
    border: 1px solid white;
    padding: 10px;
    width: 38px;
    height: 38px;
    text-align: center;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
`;

const StyledHr = styled.hr`
  border-width: 0.5;
  margin-top: 0;
  margin-bottom: ${props => props.bottomSpace ? 20 : 0}px;
`;

const FooterGrid = styled(Grid)`
  background-color: black;
  color: white;
  padding-top: 30px;
  padding-bottom: 40px;
  height: 325px;
`;

// I admit the margin-top could be done more elegantly :)
const Footer = ({ location }) => (
  <FooterGrid container spacing={0} justify="flex-end" style={{ marginTop: location.pathname === '/home' ? 0 : 30 }}>
    <Grid item xs={12} sm={12} md={8}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={4}>
          <h4>About Us</h4>
          <StyledHr />
          <p style={{ marginRight: 10 }}>Bedder uses the power of user generated content to guide other travellers like you to the best places to stay.</p>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <h4>Bedder</h4>
          <StyledHr />
          <WhiteA>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/about">Learn more</Link></li>
            <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="#">Blog</Link></li>
          </WhiteA>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <h4>Follow Us</h4>
          <StyledHr />
          <IconA>
            <li><a href={BedderConfig.getSocialUrls().facebook} target="_blank" rel="noopener noreferrer"><span className="fa fa-facebook"></span></a></li>
            <li><a href={BedderConfig.getSocialUrls().instagram} target="_blank" rel="noopener noreferrer"><span className="fa fa-instagram"></span></a></li>
          </IconA>
        </Grid>
        <Grid item xs={12}>
          <StyledHr bottomSpace />
          &copy; 2019 Bedder. All Rights Reserved.
        </Grid>
      </Grid>
    </Grid>
    <Hidden smDown>
      <Grid item md={1} >
      </Grid>
    </Hidden>
  </FooterGrid>
);

Footer.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(Footer);
