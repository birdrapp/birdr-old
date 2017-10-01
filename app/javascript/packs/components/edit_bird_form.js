import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Container, Row, Col, FormGroup, Label, Input } from 'reactstrap'

class EditBirdForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      count: "",
      notes: ""
    }

    this.handleCountChange = this.handleCountChange.bind(this)
    this.handleNotesChange = this.handleNotesChange.bind(this)
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
      <Modal size="lg" toggle={this.props.toggle} isOpen={this.props.isOpen} autoFocus={true}>
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
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button outline color="danger" onClick={this.props.toggle}>Cancel</Button>
          <Button outline color="primary" onClick={this.onBirdUpdate}>Update</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export default EditBirdForm
