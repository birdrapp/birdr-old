import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SetRecordingArea from 'clubs/SetRecordingArea';

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('recording-area-map');
  const recordingArea = el.dataset.recordingArea;

  ReactDOM.render(<SetRecordingArea recordingArea={recordingArea} />, el);
});
