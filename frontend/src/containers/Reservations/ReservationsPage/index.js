import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

import ReservationItem from 'components/ReservationItem';
import ErrorNetwork from 'components/ErrorNetwork';
import BedderLoadingIndicator from 'components/BedderLoadingIndicator';

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
  navButtonXS: {
    borderRadius: 0,
    width: 110,
  },
});

export class ReservationsPage extends React.Component {
  componentDidMount() {
    this.props.getReservationsSubmit();
  }

  render() {
    const { classes } = this.props;
    const isXS = this.props.width == 'xs' || false;
    const submitting = this.props.getReservationsSubmitting;
    let ohMyGod = 0;
    return (
      <div>
        <Helmet>
          <title>Reservations</title>
        </Helmet>

        <Typography align="center" style={{ padding: 35 }} variant="display1">
          Reservations
        </Typography>


        <div align="center">
          <Button onClick={this.props.switchNew} variant="contained" color={this.props.reservationsNew ? "primary" : "default"} className={isXS ? classes.navButtonXS : classes.navButton}>New</Button>
          <Button onClick={this.props.switchUpcoming} variant="contained" color={this.props.reservationsUpcoming ? "primary" : "default"} className={isXS ? classes.navButtonXS : classes.navButton}>Upcoming</Button>
          <Button onClick={this.props.switchPassed} variant="contained" color={this.props.reservationsPassed ? "primary" : "default"} className={isXS ? classes.navButtonXS : classes.navButton}>History</Button>
        </div>

        {submitting && (
          <BedderLoadingIndicator/>
        )}

        <Grid container justify="center" alignContent="center">
          <Grid item xs={12} md={8} lg={6} style={{padding: 20}}>
            <Grid container justify="center" alignContent="center" spacing={24}>

              {this.props.getReservationsError && (<ErrorNetwork error={this.props.getReservationsError}/>)}

              {this.props.getReservationsResult && this.props.getReservationsResult.result && this.props.getReservationsResult.result.map((v,i) => {

                if (this.props.reservationsUpcoming && (v.status < 5 || v.status >= 10)) {
                  return false;
                }
                if (this.props.reservationsNew && v.status != 0) {
                  return false;
                }
                if (this.props.reservationsPassed && moment(v.to).isAfter(moment()) || this.props.bookingsUpcoming && moment(v.to).isBefore(moment()) ) {
                  return false;
                }

                ohMyGod++;

                return (
                  <ReservationItem
                    key={v.id}
                    booking={v}
                    showControls={this.props.reservationsNew}
                    acceptBooking={this.props.acceptBooking}
                    acceptAutoBooking={this.props.acceptAutoBooking}
                    acceptAutoOffBooking={this.props.acceptAutoOffBooking}
                    declineBooking={this.props.declineBooking}
                    acceptBookingSubmitting={this.props.acceptBookingSubmitting}
                    acceptAutoBookingSubmitting={this.props.acceptAutoBookingSubmitting}
                    acceptAutoOffBookingSubmitting={this.props.acceptAutoOffBookingSubmitting}
                    declineBookingSubmitting={this.props.declineBookingSubmitting}
                    getReservationsResult={this.props.getReservationsResult}
                    getReservationsError={this.props.getReservationsError}
                    getReservationsSubmitting={this.props.getReservationsSubmitting}

                  />
                );
              })}

              {ohMyGod === 0 && this.props.getReservationsResult && this.props.getReservationsResult.result && this.props.getReservationsResult.result.length > 0 && (
                <Typography variant="title" style={{ margin: 20 }}>No result.</Typography>
              )}

            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

ReservationsPage.propTypes = {
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
  withStyles(styles),
  withMobileDialog(),
)(ReservationsPage);

export { withConnect };
