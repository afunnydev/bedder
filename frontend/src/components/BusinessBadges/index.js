import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import Security from '@material-ui/icons/Security';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

import StyledPaper from 'components/styles/StyledPaper';
import BadgePaperText from 'components/styles/BadgePaperText';

const BusinessBadges = ({ openSupport, small }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={small ? 12 : 6}>
      <StyledPaper>
        <Grid container alignItems="center">
          <Grid item xs={11}>
            <BadgePaperText variant="subtitle1" smallFont={small}>This establishment is safe</BadgePaperText>
          </Grid>
          <Grid item xs={1}>
            <Security color="primary" />
          </Grid>
        </Grid>
      </StyledPaper>
    </Grid>

    <Grid item xs={12} md={small ? 12 : 6}>
      <StyledPaper>
        <Grid container alignItems="center">
          <Grid item xs={11} style={{ cursor: 'pointer' }} onClick={openSupport}>
            <BadgePaperText variant="subtitle1" smallFont={small}>Report this establishment</BadgePaperText>
          </Grid>
          <Grid item xs={1}>
            <ErrorOutline color="primary" />
          </Grid>
        </Grid>
      </StyledPaper>
    </Grid>
  </Grid>
);

BusinessBadges.defaultProps = {
  small: false,
};

BusinessBadges.propTypes = {
  openSupport: PropTypes.func.isRequired,
  small: PropTypes.bool,
};

export default BusinessBadges;