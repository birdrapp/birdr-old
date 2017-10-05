import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Container, Row, Col, FormGroup, Label, Input } from 'reactstrap'
import update from 'immutability-helper'
import PhotoUploader from './photo_uploader'
import MapWithMarker from './map_with_marker'

class EditBirdForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      count: "",
      notes: "",
      _location: null,
      location: { lat: 0, lng: 0},
      photos: [],
      uploading: false,
      updateButtonText: "Update"
    }

    this.handleCountChange = this.handleCountChange.bind(this)
    this.handleNotesChange = this.handleNotesChange.bind(this)
    this.onPhotoQueueComplete = this.onPhotoQueueComplete.bind(this)
    this.onPhotoProgress = this.onPhotoProgress.bind(this)
    this.onPhotoUploadStart = this.onPhotoUploadStart.bind(this)
    this.onPhotoUploaded = this.onPhotoUploaded.bind(this)
    this.onPositionChanged = this.onPositionChanged.bind(this)
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      count: nextProps.bird.count || "",
      notes: nextProps.bird.notes || "",
      location: nextProps.bird.location,
      photos: nextProps.bird.photos || []
    })
  }

  onBirdUpdated = () => {
    this.props.onBirdUpdated(this.props.index, {
      count: this.state.count,
      notes: this.state.notes,
      location: this.state.location,
      photos: this.state.photos,
    })
  }

  onPhotoQueueComplete() {
    this.setState({
      uploading: false,
      updateButtonText: "Update"
    })
  }

  onPhotoProgress(uploadProgress) {
    this.setState({
      updateButtonText: `Uploading ${Math.round(uploadProgress)}%`
    })
  }

  onPhotoUploadStart() {
    this.setState({
      uploading: true
    })
  }

  onPhotoUploaded(file, response) {
    const photos = update(this.state.photos, {
      $push: [{
        id: response.id,
        url: response.image.url,
        thumbnail: response.image.thumb.url
      }]
    })

    this.setState({ photos })
  }

  onPositionChanged(location) {
    this.setState({
      location
    })
  }

  handleCountChange(event) {
    this.setState({
      count: event.target.value
    });
  }

  handleNotesChange(event) {
    this.setState({
      notes: event.target.value
    });
  }

  render() {
    return (
      <Modal className="bird-modal" size="lg" toggle={this.props.toggle} isOpen={this.props.isOpen} autoFocus={true}>
        <ModalHeader toggle={this.props.toggle}>Editing {this.props.bird.commonName}</ModalHeader>
        <ModalBody>
          <Container fluid>
            <Row>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label for="count">Count</Label>
                  <Input name="count" value={this.state.count} onChange={this.handleCountChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="notes">Notes</Label>
                  <Input name="notes" value={this.state.notes} onChange={this.handleNotesChange} />
                </FormGroup>
              </Col>
              <Col xs="12" md="6">
                <MapWithMarker
                  containerElement={<div className="my-2" style={{ height: '300px' }} />}
                  markerPosition={this.state.location}
                  onPositionChanged={this.onPositionChanged}
                  center={this.props.bird.location}
                  zoom={15}
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <PhotoUploader
                  onQueueComplete={this.onPhotoQueueComplete}
                  onTotalUploadProgress={this.onPhotoProgress}
                  onPhotoAdded={this.onPhotoUploadStart}
                  onPhotoUploaded={this.onPhotoUploaded}
                  photos={this.props.bird.photos || []} />
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.props.toggle}>Cancel</Button>
          <Button disabled={this.state.uploading} color="primary" onClick={this.onBirdUpdated}>
            {this.state.updateButtonText}
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default EditBirdForm
