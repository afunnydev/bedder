import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import ErrorNetwork from 'components/ErrorNetwork';

import moment from 'moment';

const styles = theme => ({
  card: {
    display: 'flex',
    margin: '15px 0px',
    width: '100%',
  },
  details: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  content: {
    flex: '1',
    padding: '15px 25px',
  },
  cover: {
    width: 200,
    height: 260,
  },
  title: {
    margin: '8px 0px',
  },
  gains: {
    fontWeight: 700,
    marginTop: 15,
  },
  commission: {
    textDecoration: 'underline',
    fontStyle: 'italic',
    fontSize: 12,
  },
  starRate: {
    fontSize: 14,
  },
  personIcon: {
    fontSize: 44,
  },
  middleText: {
    margin: '0px 5px',
    // fontWeight: 'bold',
    position: 'relative',
    top: 3,
    fontSize: '16pt',
  },
  bedIcon: {
    color: theme.palette.primary.main,
    fontSize: 32,
    position: 'relative',
    top: 10,
    margin: 10,
  },
});

/* eslint-disable react/prefer-stateless-function */
class ReservationItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.acceptBooking = this.acceptBooking.bind(this);
    this.acceptAutoBooking = this.acceptAutoBooking.bind(this);
    this.acceptAutoOffBooking = this.acceptAutoOffBooking.bind(this);
    this.declineBooking = this.declineBooking.bind(this);
  }

  declineBooking() {
    this.props.declineBooking(this.props.booking.id, this.props.booking.id);
  }

  acceptBooking() {
    this.props.acceptBooking(this.props.booking.id, this.props.booking.id);
  }

  acceptAutoBooking() {
    this.props.acceptAutoBooking(this.props.booking.id, this.props.booking.id);
  }

  acceptAutoOffBooking() {
    this.props.acceptAutoOffBooking(this.props.booking.id, this.props.booking.id);
  }

  // isAcceptSuccess() {
  //   return (this.props.acceptBookingResult
  //     && this.props.acceptBookingResult.has(this.props.booking.id)
  //     && this.props.acceptBookingResult.get(this.props.booking.id)
  //     && this.props.acceptBookingResult.get(this.props.booking.id).result
  //     &&
  //     (this.props.acceptBookingResult.get(this.props.booking.id).result.id
  //       // || Array.isArray(this.props.acceptBookingResult.get(this.props.booking.id).result)
  //     )
  //   );
  // }

  render() {
    const { classes, booking } = this.props;
    // const isAcceptSuccess = this.isAcceptSuccess();
    const acceptBookingSubmitting = (this.props.acceptBookingSubmitting && this.props.acceptBookingSubmitting.get(this.props.booking.id) === true) ? true : false;
    const declineBookingSubmitting = (this.props.declineBookingSubmitting && this.props.declineBookingSubmitting.get(this.props.booking.id) === true) ? true : false;
    const acceptAutoBookingSubmitting = (this.props.acceptAutoBookingSubmitting && this.props.acceptAutoBookingSubmitting.get(this.props.booking.id) === true) ? true : false;
    const acceptAutoOffBookingSubmitting = (this.props.acceptAutoOffBookingSubmitting && this.props.acceptAutoOffBookingSubmitting.get(this.props.booking.id) === true) ? true : false;
    const bu = this.props.booking.businessUnitParent ? this.props.booking.businessUnitParent : this.props.booking.businessUnit;
    const acceptAuto = bu.acceptAutomatically;
    const photo = bu.files && bu.files[0] && bu.files[0].data;
    // console.log('ReservationItem PROPS', this.props);
    return (
      <React.Fragment>
        <Card className={classes.card}>
          <CardMedia
            // component={Link}
            // to={'/booking/'+booking.id}
            className={classes.cover}
            image={photo}
            title="Img Title"
          />
          <CardContent className={classes.content}>

            <Typography align="center">
            { acceptAuto == 1 && (
              <Button disabled={acceptAutoOffBookingSubmitting} onClick={this.acceptAutoOffBooking} variant="contained" color="default" style={{margin: '2px 2px'}}>Turn off auto booking acceptance for this room</Button>
            )}
            { acceptAuto == 0 && (
              <Button disabled={acceptAutoBookingSubmitting} onClick={this.acceptAutoBooking} variant="contained" color="default" style={{margin: '2px 2px'}}>Accept automatically for this room</Button>
            )}
            </Typography>

            <Grid container={true}>
              <Grid item={true} xs={6}>
                <Typography style={{margin: '5px 0px'}} variant="subheading">{booking.businessUnit.name} of {booking.business.name}</Typography>
              </Grid>
              <Grid item={true} xs={6}>
                <Typography align="right" style={{margin: '5px 0px'}} variant="subheading">{moment(booking.createdAt).format('MMMM Do YYYY')}</Typography>
              </Grid>
            </Grid>


            <Typography variant="body2">Check-in</Typography>
            <Typography style={{margin: '5px 0px'}} variant="body1">{moment(booking.from).format('MMMM Do YYYY')} after 2 PM (14:00)</Typography>

            <Typography variant="body2">Check-out</Typography>
            <Typography style={{margin: '5px 0px'}} variant="body1">{moment(booking.to).format('MMMM Do YYYY')} before 11</Typography>

            <Typography variant="body2">Booking number</Typography>
            <Typography style={{margin: '5px 0px'}} variant="body1">000{734+booking.id}</Typography>

            <Typography variant="body2" style={{marginTop: 7}}>Peoples (x{booking.payload.maxPersons})</Typography>
            <Typography variant="body1">Main guest name: {booking.payload[0]}</Typography>

            <Typography variant="body2" style={{margin: '7px 0px'}}>Booked by</Typography>
            <Typography variant="body1">{booking.user.name}</Typography>

            <Typography variant="body2" style={{margin: '7px 0px'}}>Total cost</Typography>
            <Typography variant="body1">{Math.ceil(booking.amount)} CAD</Typography>

            {this.props.acceptBookingError && this.props.acceptBookingError.has(this.props.booking.id) && (
              <ErrorNetwork error={this.props.acceptBookingError.get(this.props.booking.id)}/>
            )}

            <Typography align="right">
              {this.props.booking.status < 5 && this.props.showControls && (
                <React.Fragment>
                  <Button disabled={acceptBookingSubmitting} onClick={this.acceptBooking} variant="contained" color="default" style={{margin: '2px 2px'}}>Accept</Button>
                  <Button disabled={declineBookingSubmitting} onClick={this.declineBooking} variant="contained" color="default" style={{margin: '2px 2px'}}>Decline</Button>
                </React.Fragment>
              )}
            </Typography>

          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}

ReservationItem.propTypes = {};

export default withStyles(styles)(ReservationItem);
