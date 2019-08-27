import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Validation } from 'react-validation-framework';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import BedderConfig from 'bedder/bedderConfig';
import BedderValidator from 'bedder/bedderValidator';

import CurrencySelector from 'components/CurrencySelector';
import Photos from 'components/Photos';
import Amenities from 'components/Amenities';

const BUSINESS_UNIT_QUERY = gql`
  query BUSINESS_UNIT_QUERY($businessUnitId: Int!) {
    businessUnit(businessUnitId: $businessUnitId) @client(always: true) {
      id
      name
      parentId
      numUnits
      bedsKing
      bedsQueen
      bedsSimple
      maxPersons
      equipment
      files {
        id
        uuid
        url
      }
      rate
      currency
      isDeleted
      isNew
      acceptAutomatically
    }
  }
`;

const styles = {
  spacedInput: {
    justifyContent: 'space-between',
  },
  rightSelect: {
    width: 120,
    textAlign: 'right',
  },
};

const Room = (props) => {
  const nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33];
  const nums0 = [0].concat(nums);
  let amenities = BedderConfig.getAmenities();

  const onChange = (event) => props.client.writeData(
    { id: `BusinessUnit:${props.unitId}`, data: { [event.target.name]: event.target.value } }
  );

  const onChangeCurrency = (newCurrency) => props.client.writeData(
    { id: `BusinessUnit:${props.unitId}`, data: { currency: newCurrency } }
  );

  const onChangeAcceptAutomatically = (value) => props.client.writeData(
    { id: `BusinessUnit:${props.unitId}`, data: { acceptAutomatically: value } }
  );

  const onChangeAmenities = (amenityKey) => {
    // Could be optimized if we weren't using a JSON string to carry the values.
    amenities[amenityKey] = !amenities[amenityKey];
    return props.client.writeData(
      { id: `BusinessUnit:${props.unitId}`, data: { equipment: JSON.stringify(amenities) } }
    );
  };

  const vs = BedderValidator.getValidators();

  // There must be a better way to do this (like a slider or something), but for now it works well.
  if (!props.visible) return null;
  return(
    <Query
      query={BUSINESS_UNIT_QUERY}
      variables={{
        businessUnitId: props.unitId
      }}
    >
      {({ data, loading, error }) => {
        if (error) return <p>Error</p>;
        if (loading) return <p>Loading...</p>;
        if (!data || !data.businessUnit) return <p>Please select a room.</p>;
        const { businessUnit } = data; 
        if (businessUnit.equipment) {
          amenities = JSON.parse(businessUnit.equipment);
        }
        return (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Validation
                  group={`room-${props.unitId}`}
                  componentTag="TextField"
                  validators={[vs.notEmpty]}
                >
                  <TextField
                    fullWidth
                    name="name"
                    label="Name of the room"
                    defaultValue={businessUnit.name}
                    onBlur={onChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Validation>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Tooltip placement="left" title="If it's a shared bedroom, you can put the number of beds here.">
                  <TextField
                    fullWidth
                    select
                    name="numUnits"
                    label="Number of the same room available"
                    value={businessUnit.numUnits}
                    onChange={onChange}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Room(s)</InputAdornment>,
                      classes: { root: props.classes.spacedInput },
                    }}
                    SelectProps={{
                      classes: { root: props.classes.rightSelect },
                    }}
                    style={{ marginBottom: 24 }}
                  >   
                    {nums.map(option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Tooltip> 
                <TextField
                  fullWidth
                  select
                  name="maxPersons"
                  label="Maximum capacity of the room"
                  value={businessUnit.maxPersons}
                  onChange={onChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Person(s)</InputAdornment>,
                    classes: { root: props.classes.spacedInput },
                  }}
                  SelectProps={{
                    classes: { root: props.classes.rightSelect },
                  }}
                >
                  {nums.map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>  
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputLabel shrink style={{ marginBottom: 8 }}>Type and quantity of bed</InputLabel>
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    select
                    name="bedsKing"
                    value={businessUnit.bedsKing}
                    onChange={onChange}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">King size bed(s)</InputAdornment>,
                      classes: { root: props.classes.spacedInput },
                    }}
                    SelectProps={{
                      classes: { root: props.classes.rightSelect },
                    }}
                  >
                    {nums0.map(option => (
                      <MenuItem key={option} value={option}>
                        {option === 0 ? 'None' : option}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    select
                    name="bedsQueen"
                    value={businessUnit.bedsQueen}
                    onChange={onChange}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Queen size bed(s)</InputAdornment>,
                      classes: { root: props.classes.spacedInput },
                    }}
                    SelectProps={{
                      classes: { root: props.classes.rightSelect },
                    }}
                  >
                    {nums0.map(option => (
                      <MenuItem key={option} value={option}>
                        {option === 0 ? 'None' : option}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    select
                    name="bedsSimple"
                    value={businessUnit.bedsSimple}
                    onChange={onChange}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Single size bed(s)</InputAdornment>,
                      classes: { root: props.classes.spacedInput },
                    }}
                    SelectProps={{
                      classes: { root: props.classes.rightSelect },
                    }}
                  >
                    {nums0.map(option => (
                      <MenuItem key={option} value={option}>
                        {option === 0 ? 'None' : option}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8}>
                <InputLabel shrink style={{ marginBottom: 8 }}>Equipment in the room</InputLabel>
                <Amenities changeFn={onChangeAmenities} amenities={amenities} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Validation
                  group={`room-${props.unitId}`}
                  valueProp="photos"
                  onChangeCallback={null}
                  componentTag="Photos"
                  validators={[vs.arrayNotEmpty]}
                >
                  <Photos
                    id={props.unitId}
                    client={props.client}
                    photos={businessUnit.files}
                    addMutation="addFileToBusinessUnit"
                    removeMutation="removeFileFromBusinessUnit"
                    crop="600x400 minimum"
                    shrink="600x400 90%"
                    label="Photos of the room*"
                    errorText="You need at least 1 photo."
                  />
                </Validation>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Validation
                  group={`room-${props.unitId}`}
                  componentTag="TextField"
                  validators={[vs.greaterThanZero]}
                >
                  <TextField
                    fullWidth
                    name="rate"
                    label="Price per night"
                    defaultValue={businessUnit.rate != 0 ? businessUnit.rate : 0}
                    onBlur={onChange}
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CurrencySelector 
                            currency={businessUnit.currency} 
                            onChange={onChangeCurrency}
                          />
                        </InputAdornment>),
                      classes: { root: props.classes.spacedInput },
                    }}
                    SelectProps={{
                      classes: { root: props.classes.rightSelect },
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Validation>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" style={{ fontSize: 14 }}>Do you want to accept booking automatically?</FormLabel>
                  <FormGroup row>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={businessUnit.acceptAutomatically}
                          onChange={() => onChangeAcceptAutomatically(true)}
                        />
                      }
                      label="Yes"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!businessUnit.acceptAutomatically}
                          onChange={() => onChangeAcceptAutomatically(false)}
                        />
                      }
                      label="No"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
          </>
        );
      }}
    </Query>
  );
};

Room.propTypes = {
  unitId: PropTypes.number,
  client: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired
};

export default withStyles(styles)(Room);
