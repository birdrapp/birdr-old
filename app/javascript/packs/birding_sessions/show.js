import React from 'react'
import ReactDOM from 'react-dom'
import MapWithMarker from '../components/map_with_marker'

window.init = () => {
  const node = document.getElementById('fullWidthMap')
  const lat = parseFloat(node.getAttribute('data-latitude'))
  const lng = parseFloat(node.getAttribute('data-longitude'))

  ReactDOM.render(
    <MapWithMarker
      containerElement={<div style={{ height: '350px' }}></div>}
      center={{ lat, lng }}
      markerPosition={{ lat, lng }}
      markerDraggable={false}
      zoom={14}
      clickableIcons={false}
      defaultOptions={{
        draggable: false,
        streetViewControl: false,
        scaleControl: false,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        rotateControl: false,
        fullscreenControl: false
      }}
    />,
    node,
  )
}
