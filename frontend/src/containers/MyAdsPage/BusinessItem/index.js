import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import DefaultImage from 'assets/images/bedder-default-bg.png';

const styles = theme => ({
  card: {
    display: 'flex',
    margin: '15px 0px',
  },
  details: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  baseOn: {
    width: 90,
    fontSize: 12,
    padding: '4px 10px',
    textAlign: 'right',
    color: 'black',
  },
  score: {
    width: 45,
  },
  scoreBox: {
    textAlign: 'center',
    padding: '7px 10px',
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    fontSize: 18,
    fontWeight: 700,
  },
  content: {
    flex: '1',
    textAlign: 'right',
    padding: '7px 15px',
  },
  cover: {
    width: 210,
    height: 210,
  },
  title: {
    fontSize: '20px',
    lineHeight: '24px',
    margin: '8px 0px',
    color: 'black',
  },
  reservations: {
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: 300,
    fontStyle: 'italic',
    marginBottom: 10,
    color: 'black',
  },
  shareDiv: {
    display: 'inline-block',
    marginLeft: 4,
  },
});

const BusinessItem = ({ classes, business }) => (
  <Card className={classes.card}>
    <CardMedia
      component={Link}
      to={`/business/${business.id}`}
      className={classes.cover}
      image={
        business.coverPhoto
          ? (business.coverPhoto.photos &&
              business.coverPhoto.photos.photos.byId[1].data) ||
            DefaultImage
          : DefaultImage
      }
      title="Title"
    />
    <CardContent 
      component={Link}
      to={`/business/${business.id}`}
      className={classes.content}
      >
      <div className={classes.details} align="right">
        <div className={classes.baseOn}>
          Based on <br /> {business.reviewsNum} reviews
        </div>
        <div className={classes.score}>
          <Paper classes={{ root: classes.scoreBox }}>
            {business.reviewsAvg > 0 ? business.reviewsAvg : '-'}
          </Paper>
        </div>
      </div>

      <Typography variant="subtitle1" className={classes.title}>
        {business.name}
      </Typography>
      <Typography variant="subtitle2" className={classes.reservations}>
        {business.bookingsCount} reservations
      </Typography>
      <FacebookShareButton
        url={`https://app.beddertravel.com/business/${business.id}`}
        className={classes.shareDiv}
        quote={`Discover ${business.name} on Bedder Travel.`}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton
        url={`https://app.beddertravel.com/business/${business.id}`}
        className={classes.shareDiv}
        title={`Discover ${business.name} on Bedder Travel.`}
        via="beddertravel"
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton
        url={`https://app.beddertravel.com/business/${business.id}`}
        className={classes.shareDiv}
        quote={`Discover ${business.name} on Bedder Travel.`}
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <EmailShareButton
        url={`https://app.beddertravel.com/business/${business.id}`}
        className={classes.shareDiv}
        subject={`Discover ${business.name} on Bedder Travel.`}
      >
        <EmailIcon size={32} round />
      </EmailShareButton>
    </CardContent>
  </Card>
);

BusinessItem.propTypes = {
  business: PropTypes.object.isRequired,
};

export default withStyles(styles)(BusinessItem);
