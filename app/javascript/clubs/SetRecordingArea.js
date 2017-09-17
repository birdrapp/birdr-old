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
        onPolygonComplete={props.onPolygonComplete}
      />
    </GoogleMap>
  );
});

class SetRecordingArea extends Component {
  state = {
    recordingArea: this.props.recordingArea
  };

  onPolygonComplete = e => {
    const latLngs = e.getPath().getArray();
    const points = latLngs
      .concat(latLngs[0])
      .map(l => `${l.lat()} ${l.lng()}`)
      .join(',');

    const wkt = `POLYGON((${points}))`;

    this.setState({ recordingArea: wkt });
  };

  render() {
    const current = this.props.recordingArea;

    return (
      <div>
        <input
          type="hidden"
          name="club[recording_area]"
          value={this.state.recordingArea}
        />
        <RecordingAreaMap
          onPolygonComplete={this.onPolygonComplete}
          containerElement={<div style={{ height: '500px' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    );
  }
}

export default SetRecordingArea;
