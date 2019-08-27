/**
 *
 * ComponentStateless
 *
 */

import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import StarIcon from '@material-ui/icons/Star';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
// import LocationOn from '@material-ui/icons/LocationOn';
import LocationOnIcon from '@material-ui/icons/LocationOn';

// import ExampleImage from './example.jpg';
import BtnBgImage from './mapButtonBackground.png';

const styles = theme => ({
  title: {
    height: 40,
    // background: 'silver',
    display: 'table-cell',
    width: '0.01%',
    margin: '0px auto',
    verticalAlign: 'middle',
  },
  titleActive: {
    color: theme.palette.primary.main,
  },
  button: {
    height: 40,
    // background: 'grey',
    minWidth: 'auto',
  },
  divider: {
    height: 10,
    // content: ' ',
    width: '100%',
  },
});

// const SomeButton = () => withStyles(styles)();

class FilterBy extends React.Component {
  render() {
    const { classes } = this.props;
    // console.log('PROPS', this.props);

    return (
      <React.Fragment>
        <Grid container style={{ marginTop: 20 }}>
          <Grid item xs={7}>
            <Typography
              variant="body1"
              className={
                this.props.sortBy == 'priceUp' ||
                this.props.sortBy == 'priceDown'
                  ? `${classes.title} ${classes.titleActive}`
                  : classes.title
              }
            >
              Price
            </Typography>
          </Grid>
          {/* The sort by price is removed because the fonctionnality doesn't work on the backend to make sure the cheapest price is returned for a business. Fixed the issue in the backend before making it available for user. */}
          {/* <Grid item xs={5}>
            <Button
              variant="contained"
              style={{ marginRight: 5 }}
              className={classes.button}
              color={this.props.sortBy == 'priceUp' ? 'primary' : 'default'}
              onClick={this.props.onChangeSortBy.bind(null, 'priceUp')}
            >
              <TrendingUpIcon />
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              color={this.props.sortBy == 'priceDown' ? 'primary' : 'default'}
              onClick={this.props.onChangeSortBy.bind(null, 'priceDown')}
            >
              <TrendingDownIcon />
            </Button>
          </Grid> */}

          <div className={classes.divider} />

          <Grid item xs={7}>
            <Typography
              variant="body1"
              className={
                this.props.sortBy == 'distanceCityCenterUp' ||
                this.props.sortBy == 'distanceCityCenterDown'
                  ? `${classes.title} ${classes.titleActive}`
                  : classes.title
              }
            >
              Distance from city center
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Button
              variant="contained"
              className={classes.button}
              color={
                this.props.sortBy == 'distanceCityCenterUp'
                  ? 'primary'
                  : 'default'
              }
              onClick={this.props.onChangeSortBy.bind(
                null,
                'distanceCityCenterUp',
              )}
            >
              <TrendingUpIcon />
            </Button>
            <Button
              variant="contained"
              style={{ marginRight: 5 }}
              className={classes.button}
              color={
                this.props.sortBy == 'distanceCityCenterDown'
                  ? 'primary'
                  : 'default'
              }
              onClick={this.props.onChangeSortBy.bind(
                null,
                'distanceCityCenterDown',
              )}
            >
              <TrendingDownIcon />
            </Button>
          </Grid>

          <div className={classes.divider} />

          <Grid item xs={7}>
            <Typography
              variant="body1"
              className={
                this.props.sortBy == 'ratingUp' ||
                this.props.sortBy == 'ratingDown'
                  ? `${classes.title} ${classes.titleActive}`
                  : classes.title
              }
            >
              Rating
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Button
              variant="contained"
              style={{ marginRight: 5 }}
              className={classes.button}
              color={this.props.sortBy == 'ratingDown' ? 'primary' : 'default'}
              onClick={this.props.onChangeSortBy.bind(null, 'ratingDown')}
            >
              <TrendingDownIcon />
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              color={this.props.sortBy == 'ratingUp' ? 'primary' : 'default'}
              onClick={this.props.onChangeSortBy.bind(null, 'ratingUp')}
            >
              <TrendingUpIcon />
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

FilterBy.propTypes = {};

export default withStyles(styles)(FilterBy);
