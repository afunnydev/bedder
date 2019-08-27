/**
 *
 * ComponentStateless
 *
 */

import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    padding: '5px;',
  },
});

function AuthGrid(props) {
  return (
    <Grid
      container
      className={props.classes.root}
      spacing={0}
      alignItems="center"
      direction="row"
      justify="center"
      alignContent="center"
    >
      <Grid item xs={12} sm={7} md={8} lg={8} xl={6}>
        {props.children}
      </Grid>
    </Grid>
  );
}

AuthGrid.propTypes = {};

export default withStyles(styles)(AuthGrid);
