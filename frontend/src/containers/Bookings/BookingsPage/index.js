import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import Grid from '@material-ui/core/Grid';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

import SearchBar from 'components/SearchBar/Loadable';
import BookingItem from 'components/BookingItem';
import BedderLoadingIndicator from 'components/BedderLoadingIndicator';
import PageTitle from 'components/styles/PageTitle';

import injectSaga from 'utils/injectSaga';
import saga from './saga';

const styles = theme => ({
  paperBg: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: '14pt',
    fontWeight: 'bold',
    padding: '5px 0px',
  },
  navButton: {
    borderRadius: 0,
    width: 130,
  },
});
/* eslint-disable react/prefer-stateless-function */
export class BookingsPage extends React.Component {
  componentDidMount() {
    this.props.getBookingSubmit();
  }

  render() {
    const { classes } = this.props;
    // console.log('bookingPage props', this.props);
    let ohMyGod = 0;
    return (
      <div>
        <Helmet>
          <title>My Bookings</title>
        </Helmet>
        <SearchBar />

        <PageTitle spaced>Reservations</PageTitle>

        {this.props.getBookingsSubmitting && (
          <BedderLoadingIndicator full />
        )}

        {this.props.getBookingsSubmitting || (

          <React.Fragment>
            <div align="center">
              <Button onClick={this.props.switchUpcoming} variant="contained" color={this.props.bookingsUpcoming ? 'primary' : 'default'} className={classes.navButton}>Upcoming</Button>
              <Button onClick={this.props.switchPassed} variant="contained" color={this.props.bookingsPassed ? 'primary' : 'default'} className={classes.navButton}>Passed</Button>
            </div>

            <Grid container justify="center" alignContent="center">
              <Grid item xs={12} md={8} lg={5} style={{padding: 20}}>
                <Grid container justify="center" alignContent="center" spacing={4}>

                  {this.props.getBookingsResult && this.props.getBookingsResult.result && this.props.getBookingsResult.result.map((v,i) => {
                    if (this.props.bookingsPassed && moment(v.to).isAfter(moment()) || this.props.bookingsUpcoming && moment(v.to).isBefore(moment())) {
                      return false;
                    }

                    ohMyGod++;
                    return (
                      <BookingItem width={this.props.width} key={i} booking={v} />
                    );
                  })}

                  { ohMyGod != 0 && this.props.getBookingsResult && this.props.getBookingsResult.result && this.props.getBookingsResult.result.length == 0 && (
                    <Typography variant="body1" style={{margin: 20}}>No bookings.</Typography>
                  )}

                  {ohMyGod == 0 && (
                    <Typography variant="body1" style={{margin: 20}}>No result.</Typography>
                  )}

                </Grid>
              </Grid>
            </Grid>
          </React.Fragment>)}
      </div>
    );
  }
}

BookingsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key: 'bookingsPage', saga });

export default compose(
  withSaga,
  withConnect,
  withMobileDialog(),
)(withStyles(styles)(BookingsPage));

export { withConnect };
