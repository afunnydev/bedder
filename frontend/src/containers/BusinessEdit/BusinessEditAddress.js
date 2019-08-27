import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MUIPlacesAutocomplete, { geocodeBySuggestion } from 'mui-places-autocomplete';

import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormHelperText from '@material-ui/core/FormHelperText';

import MyLocation from '@material-ui/icons/MyLocation';

import Map from 'components/Map';

const BusinessEditAddress = (props) => {
  const [findingLocation, setFindingLocation] = useState(false);
  const locationObj = {
    lat: Number(props.lat) || 50.038350,
    lng: Number(props.lon) || 14.437180,
  };
  const google = window.google;

  const onChange = (name, value) => props.client.writeData(
    // We want to keep the values as strings, even if we're playing with numbers.
    { id: `Address:${props.id}`, data: { [name]: value + '' } }
  );

  const setAddressFromLatLong = (lat, long) => {
    // This gets to closest address to this lat/long. Is it needed? Maybe we should tell the user that it's only there to help.
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      {
        location: { lat: lat, lng: long },
      },
      (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            const { formatted_address } = results[0];
            onChange('address', formatted_address); 
          } 
        } else {
          console.log(`Geocoder failed with status: ${status}`);
        }
        setFindingLocation(false);
      },
    );
  };

  const triggerGetGeolocation = () => {
    setFindingLocation(true);
    navigator.geolocation.getCurrentPosition(getGeolocation, getGeolocationErr);
  };

  const getGeolocation = (location) => {
    // TODO: We could show a message to the user based on the accuracy.
    const { latitude, longitude, accuracy } = location.coords;
    onChange('lat', latitude);
    onChange('lon', longitude);

    setAddressFromLatLong(latitude, longitude);
    // No need to set the findingLocation to false, it's handled by setAddressFromLatLong and leave it there because it's weirdly asynchronous..
  };

  const getGeolocationErr = () => {
    setFindingLocation(false);
  };

  const mapClick = (event) => {
    onChange('lat', event.latLng.lat());
    onChange('lon', event.latLng.lng());
  };

  const suggestionSelected = (suggestion) => {
    onChange('address', suggestion.description);
    geocodeBySuggestion(suggestion)
      .then((results) => {
        if (results.length < 1) {
          return false;
        }
        const { geometry } = results[0];
        onChange('lat', geometry.location.lat());
        onChange('lon', geometry.location.lng());
      })
      .catch(err => console.log('Geocode error message: ', err.message));
  };

  const mapApply = () => {
    setFindingLocation(true);
    setAddressFromLatLong(Number(props.lat), Number(props.lon));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8} style={{ position: 'relative', marginTop: 30, marginBottom: 20 }}>
        <MUIPlacesAutocomplete
          textFieldProps={{
            // Can't set the defaultValue on the Textfield. To make it work, I need to leave the input uncontrolled and the user can only choose something from the Autocomplete. Let's see if it's a problem.
            fullWidth: true,
            placeholder: props.address || 'Street, number, city, country...',
            id: 'location',
            label: 'Address of this accomodation*',
            helperText: 'You can use the geolocation button on the right, or see the map below to select a position directly if you can\'t find the correct address.',
            InputLabelProps: {
              shrink: true,
            },
            InputProps: {
              endAdornment: (
                <InputAdornment
                  onClick={triggerGetGeolocation}
                  position="end"
                  style={{ cursor: 'pointer' }}
                >
                  {findingLocation
                    ? <CircularProgress color="primary" size={24} />
                    : <MyLocation color="primary" />}
                </InputAdornment>
              ),
            },
          }}
          onSuggestionSelected={suggestionSelected}
          renderTarget={() => <div style={{ maxWidth: 500 }} />}
        />
      </Grid>

      <Grid item xs={12} style={{ position: 'relative' }}>
        <Map
          isMarkerShown
          mapClick={mapClick}
          loadingElement={<div style={{ height: '100%' }} />}
          containerElement={
            <div style={{ height: '330px', width: '100%', position: 'relative' }} />
          }
          mapElement={<div style={{ height: '100%' }} />}
          center={locationObj}
          markerPosition={locationObj}
          findingLocation={findingLocation}
          mapApply={mapApply}
        />
        <FormHelperText>
          You can drag the map and click it to position the marker at the location of this accomodation. Once the marker is placed, click &quot;Apply&quot; and we will take care of the rest.
        </FormHelperText>
      </Grid>
    </Grid>
  );
};

BusinessEditAddress.propTypes = {
  id: PropTypes.number.isRequired,
  lat: PropTypes.string,
  lon: PropTypes.string,
  address: PropTypes.string,
  client: PropTypes.object.isRequired,
};

export default BusinessEditAddress;