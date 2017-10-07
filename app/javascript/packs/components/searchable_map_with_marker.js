import React from 'react'
import { compose, lifecycle, withState, withHandlers, withStateHandlers } from 'recompose'
import { withScriptjs } from 'react-google-maps'
import { Input, InputGroup, InputGroupAddon } from 'reactstrap'
import MapWithMarker from './map_with_marker'
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";

const refs = {}

const placeToLocation = (place) => ({
  lat: place.geometry.location.lat(),
  lng: place.geometry.location.lng()
})

const SearchableMapWithMarker = compose(
  withHandlers({
    onPositionChanged: props => (location) => props.onPositionChanged(location),
    onPlaceChanged: props => (place) => props.onPlaceChanged(place)
  }),
  withStateHandlers(
  ({ initialCenter = null, initialZoom = 10  }) => ({
    center: initialCenter,
    zoom: initialZoom
  }),
  {
    centerMapOnLocation: ({ center }) => (place) => ({
      center: placeToLocation(place)
    }),
    setZoom: ({ zoom }) => (newZoom) => ({
      zoom: newZoom
    })
  }),
  lifecycle({
    componentWillMount() {
      this.setState({
        center: this.props.defaultCenter,
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        }
      })
    },
  })
)(({ center, defaultCenter, zoom, markerPosition, onSearchBoxMounted, centerMapOnLocation, onPlaceChanged, onPositionChanged, setZoom, searchText }) =>
  <div>
    <InputGroup className="mb-4">
      <StandaloneSearchBox
        ref={onSearchBoxMounted}
        onPlacesChanged={(places) => {
          centerMapOnLocation(refs.searchBox.getPlaces()[0])
          setZoom(17)
          onPlaceChanged(refs.searchBox.getPlaces()[0])
        }}
      >
        <Input
          type="text"
          defaultValue={searchText}
          placeholder="Search for a location..." />
      </StandaloneSearchBox>
      <InputGroupAddon>
        <i className="fa fa-map-o" />
      </InputGroupAddon>
    </InputGroup>
    <MapWithMarker
      containerElement={<div style={{height: '500px'}} />}
      onPositionChanged={onPositionChanged}
      defaultCenter={defaultCenter}
      center={center}
      markerPosition={markerPosition}
      zoom={markerPosition ? 17 : zoom}
    />
  </div>
)

export default SearchableMapWithMarker
