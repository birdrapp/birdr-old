import React from 'react'
import ReactDOMServer from 'react-dom/server'
import DropzoneComponent from 'react-dropzone-component';

class PhotoUploader extends React.Component {
  constructor(props) {
    super(props)

    this.config = {
      postUrl: '/photos',
      dropzoneSelector: '.photo-upload'
    }

    this.djsConfig = {
      paramName: "photo[image]",
      previewsContainer: ".photos-container",
      thumbnailWidth: 300,
      thumbnailHeight: 300,
      previewTemplate: ReactDOMServer.renderToStaticMarkup(
        <div className="dz-preview col-6 col-md-3 my-2">
          <img data-dz-thumbnail className="img-thumbnail" />
          <div className="progress dz-upload mt-2">
            <div className="progress-bar" role="progressbar" data-dz-uploadprogress></div>
          </div>
        </div>
      )
    }

    this.eventHandlers = {
      queuecomplete: props.onQueueComplete,
      totaluploadprogress: props.onTotalUploadProgress,
      addedfile: props.onPhotoAdded,
      success: props.onPhotoUploaded
    }
  }

  render() {
    return (
      <div>
        <div id="photos-container" className="row photos-container">
        {this.props.photos.map((photo, index) => (
          <div key={index} className="col-6 col-md-3 my-2">
            <img src={photo.thumbnail} style={{ height: '162px', width: '162px' }} className="img-thumbnail" />
          </div>
        ))}
        </div>
        <div className="photo-upload d-flex align-items-center justify-content-center flex-column p-4 mt-3">
          <div className="icon">
            <i className="fa fa-plus" />
          </div>
          <span className="dz-message">
            Add Photos
          </span>
          <small className="mt-2">
            <strong>Tip:</strong> you can drag &amp; drop your photos onto here.
          </small>
        </div>
        <DropzoneComponent config={this.config} djsConfig={this.djsConfig} eventHandlers={this.eventHandlers} />
      </div>
    )
  }
}

export default PhotoUploader
