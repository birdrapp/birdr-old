import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Polygon } from 'react-google-maps';
import DrawingManager from 'react-google-maps/lib/drawing/DrawingManager';
import { Wkt } from 'wicket/wicket';

const defaultCenter = { lat: 51.505, lng: -0.09 };
const defaultZoom = 10;
const polygonOptions = {
  fillColor: '#2980B9',
  strokeColor: '#222222',
  fillOpacity: 0.5,
  strokeWeight: 3,
  clickable: false,
  editable: true,
  zIndex: 1
};

const pathsFromWkt = wkt => {
  const w = new Wkt();
  w.read(wkt);
  const geoJSON = w.toJson();
  return geoJSON.coordinates.map(a => {
    return a.map(p => ({
      lat: p[0],
      lng: p[1]
    }));
  });
};

const RecordingAreaMap = withGoogleMap(props => {
  const { initialRecordingArea } = props;

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
          polygonOptions
        }}
        onPolygonComplete={props.onUpdate}
      />
      {initialRecordingArea && (
        <Polygon
          options={polygonOptions}
          paths={pathsFromWkt(initialRecordingArea)}
        />
      )}
    </GoogleMap>
  );
});

class SetRecordingArea extends Component {
  state = {
    recordingArea: this.props.recordingArea
  };

  onUpdate = e => {
    const latLngs = e.getPath().getArray();
    const points = latLngs
      .concat(latLngs[0])
      .map(l => `${l.lat()} ${l.lng()}`)
      .join(',');

    const wkt = `POLYGON((${points}))`;

    this.setState({ recordingArea: wkt });
  };

  render() {
    const initialRecordingArea = this.props.recordingArea;

    return (
      <div>
        <input
          type="hidden"
          name="club[recording_area]"
          value={this.state.recordingArea}
        />
        <RecordingAreaMap
          initialRecordingArea={initialRecordingArea}
          onUpdate={this.onUpdate}
          containerElement={<div style={{ height: '500px' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    );
  }
}

export default SetRecordingArea;
