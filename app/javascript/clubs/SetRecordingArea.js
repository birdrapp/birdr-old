import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import SearchBox from 'react-google-maps/lib/places/SearchBox';

const defaultCenter = { lat: 51.505, lng: -0.09 };
const defaultZoom = 10;

const RecordingAreaMap = withGoogleMap(props => {
  return (
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={defaultZoom}
      defaultCenter={defaultCenter}
    />
  );
});

class SetRecordingArea extends Component {
  render() {
    return (
      <RecordingAreaMap
        containerElement={<div style={{ height: '500px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    );
  }
}

export default SetRecordingArea;
