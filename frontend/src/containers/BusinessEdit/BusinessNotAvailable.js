import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const BusinessNotAvailable = () => (
  <Grid container justify="center">
    <Grid item xs={12} sm={6}>
      <Typography variant="subtitle1" align="center">This business isn&#39;t currently available. Please make sure that the owner of this business has successfully created an account before you can start adding information. Contact us at info@beddertravel.com if you need any help.</Typography>
    </Grid>
  </Grid>
);

export default BusinessNotAvailable;