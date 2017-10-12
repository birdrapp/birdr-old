import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { compose, withProps, lifecycle, withHandlers } from "recompose"

const positionToObject = (position) => ({ lat: position.lat(), lng: position.lng() })

const MapWithMarker = compose(
  withProps({
    mapElement: <div className="rounded" style={{ height: '100%' }} />,
    loadingElement: <div style={{ height: `100%` }} />,
  }),
  withHandlers(() => {
    const refs = {
      marker: null
    }

    return {
      onMarkerMounted: () => ref => {
        refs.marker = ref
      },

      positionChanged: (props) => () => {
        props.onPositionChanged(positionToObject(refs.marker.getPosition()))
      }
    }
  }),
  withGoogleMap
  )((props) =>
    <GoogleMap
      zoom={props.zoom || 10}
      center={props.center || props.defaultCenter || { lat: 51.505, lng: -0.09 }}
      {...props}
    >
     {props.markerPosition &&
      <Marker
        position={props.markerPosition}
        ref={props.onMarkerMounted}
        draggable={props.markerDraggable}
        onPositionChanged={props.positionChanged}
      />}
    </GoogleMap>
  )

export default MapWithMarker
