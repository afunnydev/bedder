import React from 'react';
import { Helmet } from 'react-helmet';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const BusinessSubmitted = () => (
  <>
    <Helmet>
      <title>Business Submitted</title>
    </Helmet>
    <Grid container justify="center">
      <Grid item xs={12} sm={6}>
        <Typography variant="h3" align="center" gutterBottom style={{ fontWeight: 300, marginTop: 30}}>Business Submitted</Typography>
        <Typography variant="subtitle1" align="center">Thanks for submitting a new business on our platform. A member of our team will review this business&#39; information before it can be booked. This process could take up to 3 business days, but you will be notified by email of any changes when it is done. While we&#39;re at it, enjoy your trip! 🙌 🎉 🛩</Typography>
        {/* <div style={{ width: '100%', height: 0, paddingBottom: '63%', position: 'relative', marginTop: 40 }}><iframe src="https://giphy.com/embed/dCBAKEKPJTU8Ad9l3S" width="100%" height="100%" style={{ position:'absolute' }} frameBorder="0" className="giphy-embed" allowFullScreen></iframe></div><p><a target="_blank" rel="noopener noreferrer" href="https://giphy.com/gifs/universalafrica-kalawa-jazzmee-vetkuk-kalawajazmee-dCBAKEKPJTU8Ad9l3S">via GIPHY</a></p> */}
      </Grid>
    </Grid>
  </>
);

export default BusinessSubmitted;