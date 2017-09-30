import React from 'react';
import { withGoogleMap, GoogleMap, Polygon } from 'react-google-maps';
import DrawingManager from 'react-google-maps/lib/drawing/DrawingManager';
import { wktToPaths } from './util';

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
const drawingOptions = {
  drawingControl: true,
  drawingControlOptions: {
    position: google.maps.ControlPosition.TOP_CENTER,
    drawingModes: [google.maps.drawing.OverlayType.POLYGON]
  },
  polygonOptions
};

const RecordingAreaMap = withGoogleMap(props => {
  const { initialRecordingArea } = props;
  const initialPaths = wktToPaths(initialRecordingArea);

  return (
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={defaultZoom}
      defaultCenter={defaultCenter}
    >
      <DrawingManager
        defaultDrawingMode={google.maps.drawing.OverlayType.POLYGON}
        defaultOptions={drawingOptions}
        onPolygonComplete={props.onUpdate}
      />
      {initialRecordingArea && (
        <Polygon options={polygonOptions} paths={initialPaths} />
      )}
    </GoogleMap>
  );
});

export default RecordingAreaMap;
