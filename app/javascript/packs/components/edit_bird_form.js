import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Container, Row, Col, FormGroup, Label, Input } from 'reactstrap'
import PhotoUploader from './photo_uploader'

class EditBirdForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      count: "",
      notes: "",
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
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      count: nextProps.initialCount,
      notes: nextProps.initialNotes
    })
  }

  onBirdUpdate = () => {
    this.props.onBirdUpdate({
      count: this.state.count,
      notes: this.state.notes
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
    this.props.onBirdUpdate({
      photos
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
