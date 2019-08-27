import React from 'react';
import PropTypes from 'prop-types';

import {
  GoogleMap,
  Marker,
  withGoogleMap,
  InfoWindow,
  OverlayView
} from 'react-google-maps';

import MapPrice from 'components/styles/MapPrice';
import mapStyle from 'utils/mapStyle';


const Map = (props) => {
  const onMapMarkerClick = () => {};
  const { defaultCenter, result } = props;

  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={defaultCenter}
      defaultMapTypeId='roadmap'
      defaultOptions={{ 
        styles: mapStyle,
        mapTypeControl: false,
        streetViewControl: false,
      }}
    >
      { result &&
        result.result &&
        result.result.length > 0 &&
        result.result.map((v, i) => console.log(v) || (              
          <OverlayView
            key={i}
            value={v}
            position={{
              lat: parseFloat(v.business.address.lat),
              lng: parseFloat(v.business.address.lon),
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={(width, height) => ({ x: -(width / 2), y: -(height) })}
          >
            <MapPrice onClick={() => onMapMarkerClick()}>
              {Math.round(v.businessUnit.fullRate/100)}$
            </MapPrice>
          </OverlayView>
        ))}
    </GoogleMap>
  );
};

Map.propTypes = {
  result: PropTypes.object.isRequired,
  defaultCenter: PropTypes.object.isRequired,
  // Required for the withGoogleMap HOC
  loadingElement: PropTypes.object.isRequired,
  containerElement: PropTypes.object.isRequired,
  mapElement: PropTypes.object.isRequired
};

export default withGoogleMap(Map);
