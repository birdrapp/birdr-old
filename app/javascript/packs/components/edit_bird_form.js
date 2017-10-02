import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Container, Row, Col, FormGroup, Label, Input } from 'reactstrap'
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
      count: nextProps.initialCount,
      notes: nextProps.initialNotes,
      location: nextProps.initialLocation
    })
  }

  onBirdUpdate = () => {
    // Update the location the the last reported position of the marker
    this.setState({
      location: this.state._location
    })

    this.props.onBirdUpdate({
      count: this.state.count,
      notes: this.state.notes,
      location: this.state._location,
      photos: this.state.photos
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
      $push: response.id
    })

    this.setState({ photos })
  }

  onPositionChanged(location) {
    this.setState({
      _location: location
    })
  }

  handleCountChange = (event) => {
    this.setState({
      count: event.target.value
    });
  }

  handleNotesChange = (event) => {
    this.setState({
      notes: event.target.value
    });
  }

  render() {
    return (
      <Modal className="bird-modal" size="lg" toggle={this.props.toggle} isOpen={this.props.isOpen} autoFocus={true}>
        <ModalHeader toggle={this.props.toggle}>Editing {this.props.birdName}</ModalHeader>
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
                  containerElement={<div style={{ height: '300px' }} />}
                  mapElement={<div className="rounded my-2" style={{ height: '100%' }} />}
                  loadingElement={<div style={{ height: `100%` }} />}
                  position={this.state.location}
                  googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyCC3Ebzxe2VKuB54kd9baaW-7ztMxyRDA4&libraries=places'
                  onPositionChanged={this.onPositionChanged}
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12">
                <PhotoUploader
                  onQueueComplete={this.onPhotoQueueComplete}
                  onTotalUploadProgress={this.onPhotoProgress}
                  onPhotoAdded={this.onPhotoUploadStart}
                  onPhotoUploaded={this.onPhotoUploaded} />
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.props.toggle}>Cancel</Button>
          <Button disabled={this.state.uploading} color="primary" onClick={this.onBirdUpdate}>
            {this.state.updateButtonText}
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default EditBirdForm
