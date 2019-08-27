import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

import HelpOutline from '@material-ui/icons/HelpOutline';

import businessItemStyles from './businessItemStyles';
import DefaultImage from 'assets/images/bedder-default-bg.png';
import BedderConfig from 'bedder/bedderConfig';

const BusinessItem = (props) => {
  const { classes, value, days } = props;
  const { fullRate } = value.businessUnit;
  const amenities = JSON.parse(value.business.amenities);
  const propertyTypes = BedderConfig.getFilterPropertyTypes();
  const roomPrice = fullRate / 100;
  return (
    <React.Fragment>
      <Card
        component={Link}
        to={`/business/view/${value.business.id}`}
        className={classes.card}
        style={{ margin: 5 }}
      >
        <CardMedia
          className={classes.media}
          image={
            value.business.coverPhotos && value.business.coverPhotos.length
              ? value.business.coverPhotos[0].url
              : DefaultImage
          }
          title={value.business.name}
        />
        <CardContent classes={{ root: classes.cardContent }}>
          <Grid container>
            <Grid item xs={9}>
              <Typography variant="h4" className={classes.businessName}>
                {value.business.name}
              </Typography>
              <Typography
                variant="body1"
                noWrap
                className={classes.locationText}
              >
                <span className={`icon-map ${classes.iconLocation}`} />
                {value.business.address.address}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <div align="right">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.ratingButton}
                >
                  {value.business.reviewsAvg > 0
                    ? value.business.reviewsAvg
                    : '-'}
                </Button>
                <Typography className={classes.reviewsText}>
                  {value.business.reviewsNum} reviews
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} style={{ marginTop: 20 }}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={12} lg={7}>
                  <Chip label={propertyTypes[parseInt(value.business.propertyType)].value} variant="outlined" className={classes.chip} />
                  {amenities['wifi'] && <Chip label="Wifi" variant="outlined" className={classes.chip} />}
                  {amenities['free_breakfast'] && <Chip label="Free Breakfast" variant="outlined" className={classes.chip} />}
                  {amenities['swimming_pool'] && <Chip label="Swimming Pool" variant="outlined" className={classes.chip} />}
                </Grid>
                <Grid item xs={6} sm={12} lg={5}>
                  <Typography
                    align="right"
                    color="primary"
                    variant="body2"
                    className={classes.priceText}
                  >
                    ${Math.round(roomPrice)} USD<span>/ night</span>
                  </Typography>
                  <Tooltip title={`Total for ${days} night${days > 1 ? 's' : ''}, including the 1 USD booking fee.`} placement="bottom">
                    <Typography
                      align="right"
                      variant="body2"
                      className={classes.totalText}
                    >
                      ${Math.round(roomPrice * days) + 1} USD in total<HelpOutline className={classes.helpIcon} />
                    </Typography>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

BusinessItem.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired,
  days: PropTypes.number.isRequired,
};

export default withStyles(businessItemStyles)(BusinessItem);
