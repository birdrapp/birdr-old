import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import DrawingManager from 'react-google-maps/lib/drawing/DrawingManager';

const defaultCenter = { lat: 51.505, lng: -0.09 };
const defaultZoom = 10;

const RecordingAreaMap = withGoogleMap(props => {
  return (
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={defaultZoom}
      defaultCenter={defaultCenter}
    >
      <DrawingManager
        defaultDrawingMode={google.maps.drawing.OverlayType.POLYGON}
        defaultOptions={{
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [google.maps.drawing.OverlayType.POLYGON]
          },
          polygonOptions: {
            fillColor: '#2980B9',
            strokeColor: '#222222',
            fillOpacity: 0.5,
            strokeWeight: 3,
            clickable: false,
            editable: true,
            zIndex: 1
          }
        }}
      />
    </GoogleMap>
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
