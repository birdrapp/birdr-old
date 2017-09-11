import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SetRecordingArea from 'clubs/SetRecordingArea';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <SetRecordingArea />,
    document.getElementById('recording-area-map')
  );
});
