import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Star from '@material-ui/icons/Star';

const styles = {
  root: {
    fontSize: '12px', 
    lineHeight: 1.5, 
    marginBottom: 15, 
    height: 43,
    textTransform: 'none',
    textStyle: 'italic',
  },
  label: {
    fontSize: '18px',
    fontWeight: 700,
  }
};

const ReviewButton = ({ bookingId, classes }) => (
  <Button
    component={Link}
    to={`/review/add/${bookingId}`}
    variant="contained"
    fullWidth
    color="primary"
    classes={classes}
  >
    Leave a review <Star style={{ marginLeft: 10 }} />
  </Button>
);

ReviewButton.propTypes = {
  classes: PropTypes.object.isRequired,
  bookingId: PropTypes.number.isRequired,
};

export default withStyles(styles)(ReviewButton);