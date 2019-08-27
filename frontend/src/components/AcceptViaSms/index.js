import React from 'react';
import PropTypes from 'prop-types';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';

const AcceptViaSms = ({ checked, onClick }) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend" style={{ fontSize: 14 }}>Does the owner want to accept bookings via SMS?</FormLabel>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={() => onClick(true)}
            />
          }
          label="Yes"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={!checked}
              onChange={() => onClick(false)}
            />
          }
          label="No"
        />
      </FormGroup>
      <FormHelperText style={{ marginTop: '-3px' }}>The owner will still be able to accept bookings via his account, or by email.</FormHelperText>
    </FormControl>
  );
};

AcceptViaSms.propTypes = {
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default AcceptViaSms;
