import React from 'react';
import GoogleMapReact from 'google-map-react';

const defaultLocation = { lat: 51.505, lng: -0.09 };
const defaultZoom = 10;
const apiKey = 'AIzaSyCC3Ebzxe2VKuB54kd9baaW-7ztMxyRDA4';

const SetRecordingArea = () => {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <GoogleMapReact
        defaultCenter={defaultLocation}
        defaultZoom={defaultZoom}
        bootstrapURLKeys={{ key: apiKey }}
      />
    </div>
  );
};

export default SetRecordingArea;
