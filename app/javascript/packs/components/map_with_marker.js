import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const refs = {}

const onMarkerMounted = (marker) => {
  refs.marker = marker
}

const positionToObject = (position) => ({ lat: position.lat(), lng: position.lng() })

const MapWithMarker = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={props.position}
  >
    <Marker
      defaultPosition={props.position}
      position={props.position}
      ref={onMarkerMounted}
      draggable={true}
      onPositionChanged={() => props.onPositionChanged(
        positionToObject(refs.marker.getPosition())
      )}
    />
  </GoogleMap>
))

export default MapWithMarker
