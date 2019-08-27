import React from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, Marker, withGoogleMap } from 'react-google-maps';

import Button from '@material-ui/core/Button';

import markerImg from 'assets/images/map-marker.png';
import mapStyle from 'utils/mapStyle';

const google = window.google;

const Map = props => (
  <GoogleMap
    defaultZoom={14}
    onClick={props.mapClick}
    center={props.center}
    defaultMapTypeId='roadmap'
    defaultOptions={{ 
      styles: mapStyle,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false,
    }}
  >
    <Marker
      position={props.markerPosition}
      icon={markerImg}
    />
    <Button
      variant="contained"
      color="primary"
      disabled={props.findingLocation}
      style={{ 
        position: 'absolute', 
        bottom: 25,
        right: 80,
        background: 'linear-gradient(90deg, rgb(141, 64, 65) 0%, rgb(75, 65, 140) 100%)',
        padding: '8px 50px',
        opacity: '0.9',
        color: 'white !important', 
      }}
      onClick={props.mapApply}
    >
      Apply
    </Button>
  </GoogleMap>
);

Map.propTypes = {
  mapClick: PropTypes.func.isRequired,
  center: PropTypes.object.isRequired,
  markerPosition: PropTypes.object.isRequired,
  findingLocation: PropTypes.bool,
  mapApply: PropTypes.func.isRequired,
};

export default withGoogleMap(Map);
