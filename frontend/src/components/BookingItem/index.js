import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';

import PersonIcon from '@material-ui/icons/Person';
import Place from '@material-ui/icons/PlaceOutlined';

import DefaultImage from 'assets/images/bedder-default-bg.png';
import bookingItemStyles from './bookingItemStyles.js';

class BookingItem extends React.Component {
  render() {
    const { classes, booking } = this.props;
    const bu = booking.businessUnitParent ? booking.businessUnitParent : booking.businessUnit;
    const image = bu.files && bu.files.length > 0 ? bu.files[0].url : DefaultImage;
    const isMobile = this.props.width == 'xs' || this.props.width == 'sm';

    return (
      <React.Fragment>
        <Card className={isMobile ? classes.cardMobile : classes.card}>
          <CardMedia
            component={Link}
            to={'/booking/'+booking.id}
            className={isMobile? classes.coverMobile : classes.cover}
            image={image}
            title="TOtle"
          />
          <CardContent className={isMobile ? classes.contentMobile : classes.content}>
            <Typography style={{margin: '0px 0px 5px'}} variant="h5">{booking.business.name}</Typography>
            <Typography style={{margin: '10px 0px', fontStyle: 'italic'}} color="primary">
              <Place/> {booking.business.address.address}
            </Typography>
            <Divider />

            <Typography style={{margin: '5px 0px'}} variant="subtitle1">{moment(booking.from).format('MMM Do YYYY')} - {moment(booking.to).format('MMM Do YYYY')}</Typography>

            <PersonIcon color="primary" className={classes.personIcon}/>
            {/* TODO: Show real number of person */}
            <span className={classes.middleText}>2</span>
            <Icon className={classes.bedIcon + ' icon-bed'} />

            <span className={classes.middleText}>
              {Number(booking.businessUnit.bedsKing)
              + Number(booking.businessUnit.bedsQueen)
              + Number(booking.businessUnit.bedsSimple)}</span>
            {/*<div className={classes.details} align="right">*/}

            {/*/!*<div className={classes.baseOn}>Base on <br/> 0 reviews</div>*!/*/}
            {/*/!*<div className={classes.score}>*!/*/}
            {/*/!*<Paper classes={{root: classes.scoreBox}}>4,8</Paper>*!/*/}
            {/*/!*</div>*!/*/}

            {/*</div>*/}
            <Typography style={{ marginTop: 10, marginBottom: -15, color: booking.status === 5 ? 'green' : 'inherit' }}>
              {booking.status <= 5 && ('Status: ')}
              {booking.status === 5 ? 'Confirmed' : 'Awaiting confirmation'}
            </Typography>


          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}

BookingItem.propTypes = {
  width: PropTypes.string.isRequired,
  booking: PropTypes.object.isRequired
};

export default withStyles(bookingItemStyles)(BookingItem);
