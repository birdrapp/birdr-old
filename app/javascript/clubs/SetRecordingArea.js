import React, { Component } from 'react';
import RecordingAreaMap from './RecordingAreaMap';
import { pathToWkt } from './util';

class SetRecordingArea extends Component {
  state = {
    recordingArea: this.props.recordingArea
  };

  onUpdate = e => {
    const wkt = pathToWkt(e.getPath());

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
