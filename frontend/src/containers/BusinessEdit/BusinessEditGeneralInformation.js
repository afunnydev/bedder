import React from 'react';
import PropTypes from 'prop-types';
import { Validation } from 'react-validation-framework';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

import ShrinkedInputLabel from 'components/styles/ShrinkedInputLabel';

import BedderValidator from 'bedder/bedderValidator';
import BedderConfig from 'bedder/bedderConfig';
import calculateProgress from 'utils/calculateProgress';

import Amenities from 'components/Amenities';
import AcceptViaSms from 'components/AcceptViaSms';
import ProgressTitle from './ProgressTitle.js';
import BusinessEditAddress from './BusinessEditAddress.js';

const propertyTypes = BedderConfig.getFilterPropertyTypes();
const propertyMoods = BedderConfig.getPropertyMoods();

const BusinessEditGeneralInformation = (props) => {
  const onChange = (event) => props.client.writeData(
    { id: `Business:${props.id}`, data: { [event.target.name]: event.target.value } }
  );

  const changeSmsValidation = (value) => props.client.writeData(
    { id: `Business:${props.id}`, data: { smsValidation: value } }
  );

  const onChangeAmenities = (amenityKey) => {
    // Could be optimized if we weren't using a JSON string to carry the values.
    amenities[amenityKey] = !amenities[amenityKey];
    return props.client.writeData(
      { id: `Business:${props.id}`, data: { amenities: JSON.stringify(amenities) } }
    );
  };

  const vs = BedderValidator.getValidators();
  const progress = calculateProgress([props.name, props.mood, props.propertyType, props.address.address]);
  // New business comes with a null property. We set up the default value for them, which will be pushed in localstorage on first click.
  const amenities = props.amenities ? JSON.parse(props.amenities) : BedderConfig.getAmenities();
  return(
    <Grid container>
      <Grid item xs={12} md={3} style={{ paddingRight: 30 }}>
        <ProgressTitle text="General information" progress={progress} />
      </Grid>
      <Grid item xs={12} md={9}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Validation
              group="generalInformation"
              componentTag="TextField"
              validators={[vs.notEmpty]}
            >
              <TextField
                fullWidth
                name="name"
                label="Name of this accomodation*"
                // It's an uncontrolled input, local state updated onBlur only
                defaultValue={props.name}
                onBlur={onChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Validation>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Validation
              group="generalInformation"
              componentTag="TextField"
              validators={[vs.notEmpty]}
            >
              <TextField
                fullWidth
                select
                name="mood"
                label="Mood of this accomodation"
                value={props.mood || ''}
                onChange={onChange}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {propertyMoods.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </Validation>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Validation
              group="generalInformation"
              componentTag="TextField"
              validators={[vs.notEmpty]}
            >
              <TextField
                fullWidth
                select
                name="propertyType"
                label="Type of this accomodation"
                value={props.propertyType || ''}
                onChange={onChange}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {propertyTypes.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </Validation>
          </Grid>

          <Grid item xs={12}>
            <AcceptViaSms checked={props.smsValidation} onClick={changeSmsValidation}/>
          </Grid>

          <Grid item xs={12}>
            <div style={{ marginBottom: 10, marginTop: 10 }}>
              <ShrinkedInputLabel>On-site amenities</ShrinkedInputLabel>
            </div>
            <Amenities changeFn={onChangeAmenities} amenities={amenities} />
          </Grid>
        </Grid>

        <BusinessEditAddress 
          {...props.address}
          client={props.client}
        />

      </Grid>
    </Grid>
  );
};

BusinessEditGeneralInformation.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  mood: PropTypes.string,
  propertyType: PropTypes.string,
  amenities: PropTypes.string,
  address: PropTypes.object,
  smsValidation: PropTypes.bool.isRequired,
  client: PropTypes.object.isRequired,
};

export default BusinessEditGeneralInformation;
