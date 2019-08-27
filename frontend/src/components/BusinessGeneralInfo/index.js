import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import BedderConfig from 'bedder/bedderConfig';

import Amenities from 'components/Amenities';

import BusinessViewReviews from 'components/BusinessViewReviews';

const StyledPaper = styled(Paper)`
  padding: 25px;
  text-align: center;
  height: 100%;
`;

const styles = theme => ({
  divider: {
    width: '90%',
    margin: '20px auto 20px',
  },
  address: {
    margin: '0px',
    fontStyle: 'italic',
    fontWeight: 300,
    '& a': {
      color: '#8f3f3f !important',
      cursor: 'pointer',
    }
  },
  paperBg: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '5px 0px',
  },
  needHelpBtn: {
    padding: '10px 0px'
  }
});

const GeneralInfo = ({ id, name, address, reviewsAvg, reviewsNum, amenities, classes, openSupport, showReviews }) => {
  const messages = BedderConfig.getReviewMessages();
  return (
    <Grid container spacing={2}>
      <Grid item xs={8} md={8}>
        <StyledPaper elevation={2}>
          <Typography gutterBottom variant="h5">{name}</Typography>
          <Divider light classes={{ root: classes.divider }}/>
          <Typography noWrap classes={{ root: classes.address }} color="primary">
            <span className="icon-map" style={{ marginRight: 15 }} />
            <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.address)}`}>
              {address.address}
            </a>
          </Typography>
        </StyledPaper>
      </Grid>
      <Hidden smDown>
        <Grid item md={2}>
          <StyledPaper elevation={2}>
            <Typography
              align="center"
              style={{ marginBottom: 10, fontSize: '0.8em' }}
            >
              Need help with this location?
            </Typography>
            <Button
              onClick={openSupport}
              color="primary"
              variant="contained"
              classes={{ root: classes.needHelpBtn }}
            >
              <span className="icon-chat" />
            </Button>
          </StyledPaper>
        </Grid>
      </Hidden>
      <Grid item xs={4} md={2}>
        <StyledPaper elevation={2}>
          <Paper className={classes.paperBg}>
            {reviewsAvg > 0
              ? reviewsAvg
              : '-'}
          </Paper>
          <Typography style={{ marginTop: 10, fontSize: '0.8em' }}>
            Based on {reviewsNum} reviews
          </Typography>
          <Typography color="primary" variant="subtitle1">
            {reviewsAvg > 0
              ? messages[Math.round(reviewsAvg)]
              : 'New'}
          </Typography>
        </StyledPaper>
      </Grid>

      {showReviews && <Grid item xs={12} style={{ margin: '0px 0px' }}>
        <BusinessViewReviews businessId={id} />
      </Grid>}

      {amenities && <Grid item xs={12} style={{ margin: '0px 0px' }}>
        <Typography variant="body1" gutterBottom style={{ fontWeight: 500, fontSize: 16, fontStyle: 'italic' }}>On-site amenities</Typography>
        <Amenities
          noClick
          hideNotSelected
          orange
          amenities={JSON.parse(amenities)}
        />
      </Grid>}
    </Grid>
  );
};

GeneralInfo.propTypes = {
  showReviews: false,
};

GeneralInfo.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.object.isRequired,
  reviewsNum: PropTypes.number.isRequired,
  reviewsAvg: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  openSupport: PropTypes.func.isRequired,
  amenities: PropTypes.string,
  showReviews: PropTypes.bool,
};

export default withStyles(styles)(GeneralInfo);