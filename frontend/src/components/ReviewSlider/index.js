/**
 *
 * ReviewSlider
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Slider } from 'material-ui-slider';

import BedderConfig from 'bedder/bedderConfig';

const ReviewSlider = ({ rating, onChange, ratingToUpdate, text, step }) => {
  const messages = BedderConfig.getReviewMessages();
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography align="left" style={{ color: 'black', fontWeight: 700, fontStyle: 'italic' }}>{text}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography align="right" style={{ color: '#c26c6a', fontWeight: 500 }}>{messages[rating]}</Typography>
      </Grid>
      <Slider
        onChange={sliderValue => onChange(ratingToUpdate, sliderValue)}
        min={1}
        max={10}
        defaultValue={10}
        scaleLength={step ? 1 : 0}
      />
    </Grid>
  );
};

ReviewSlider.propTypes = {
  rating: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  ratingToUpdate: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  step: PropTypes.bool,
};

export default ReviewSlider;
