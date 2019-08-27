/**
 *
 * LogoFormGrid
 *
 */

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Logo from '../Logo';

const LogoFormGrid = props => (
  <Grid
    container
    spacing={3}
    alignItems="center"
    direction="row"
    justify="center"
  >
    <Grid item xs={9} sm={7} md={7} lg={7} xl={6} style={{ textAlign: 'center' }}>
      <Logo />
    </Grid>
    <Grid item xs={11} sm={10} md={9} lg={8} xl={7}>
      {props.children}
    </Grid>
  </Grid>
);

LogoFormGrid.propTypes = {};

export default LogoFormGrid;
