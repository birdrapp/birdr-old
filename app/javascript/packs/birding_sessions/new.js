import React from 'react'
import ReactDOM from 'react-dom'
import update from 'immutability-helper'
import { Row, Col, FormGroup, Label, Input, Card, CardHeader, ListGroup, InputGroup, InputGroupAddon } from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import EditableBirdList from '../components/editable_bird_list'
import EditBirdForm from '../components/edit_bird_form'
import SearchableBirdList from '../components/searchable_bird_list'
import SearchableMapWithMarker from '../components/searchable_map_with_marker'

const fieldName = (attribute, index, multi = false) => {
  var name = "birding_session[bird_records_attributes][" + index + "][" + attribute + "]"
  if (multi) name += "[]"
  return name
}
const HiddenInput = (props) => <input value={props.value} className="form-control hidden" type="hidden" name={fieldName(props.attribute, props.index, props.multi)} />
const locationToWkt = (location) => `POINT(${location.lng} ${location.lat})`

const toHiddenFields = (birdRecord, index) => {
  return (
    <div key={index}>
      <HiddenInput value={birdRecord.id} attribute="bird_id" index={index} />
      <HiddenInput value={birdRecord.count} attribute="count" index={index} />
      <HiddenInput value={birdRecord.notes} attribute="notes" index={index} />
      <HiddenInput value={locationToWkt(birdRecord.location)} attribute="location" index={index} />
      <div>
        {birdRecord.photos.map((photo, photoIndex) => (
          <HiddenInput key={photoIndex} multi value={photo.id} attribute="photo_ids" index={photoIndex} />
        ))}
      </div>
    </div>
  )
}

class AddBirdRecords extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      start_time: null,
      location: { lat: 51.505, lng: -0.09 },
      location_name: null,
      location_address: null,
      editingBird: null,
      currentBirdIndex: null,
      modalOpen: false,
      birdRecords: []
    }

    this.addBirdRecord = this.addBirdRecord.bind(this)
    this.birdRecordUpdated = this.birdRecordUpdated.bind(this)
    this.editBird = this.editBird.bind(this)
    this.placeChanged = this.placeChanged.bind(this)
    this.positionUpdated = this.positionUpdated.bind(this)
    this.removeBirdFromList = this.removeBirdFromList.bind(this)
    this.toggleEditBirdForm = this.toggleEditBirdForm.bind(this)
  }

  addBirdRecord(bird) {
    this.setState(prevState => ({
      birdRecords: [...prevState.birdRecords, {
        id: bird.id,
        commonName: bird.commonName,
        notes: "",
        count: "",
        location: prevState.location,
        photos: []
      }]
    }))
  }

  birdRecordUpdated(index, changeset) {
    const birdRecords = update(this.state.birdRecords, {
      [index]: {
        $merge: changeset
      }
    })

    this.setState({
      birdRecords,
      editingBird: null,
      modalOpen: false,
      currentBirdIndex: null
    })
  }

  editBird(birdIndex) {
    this.setState({
      modalOpen: true,
      currentBirdIndex: birdIndex,
      editingBird: this.state.birdRecords[birdIndex]
    })
  }

  placeChanged(place) {
    const location = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    }
    this.setState({
      location
    })
  }

  positionUpdated(location) {
    const birdRecords = this.state.birdRecords.map(birdRecord => {
      birdRecord.location = location
      return birdRecord
    })
    this.setState({
      location,
      birdRecords
    })
  }

  removeBirdFromList(index) {
    const birdRecords = update(this.state.birdRecords, {
      $splice: [[index, 1]]
    })

    this.setState({
      birdRecords
    })
  }

  toggleEditBirdForm() {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs="12" md="4">
            <h5>Date &amp; Time</h5>
            <p>
              <small><strong>Tip:</strong> you can change the time of each bird later.</small>
            </p>
          </Col>
          <Col xs="12" md="4">
            <FormGroup>
              <Label for="birding_session_date">Date</Label>
              <InputGroup className="flatpickr">
                <Flatpickr
                  name="birding_session[date]"
                  options={{ altInput: true, maxDate: new Date(), defaultDate: new Date() }}
                />
                <InputGroupAddon>
                  <i className="fa fa-calendar" />
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </Col>
          <Col xs="12" md="4">
            <FormGroup>
              <Label for="birding_session_start_time">Start Time</Label>
              <InputGroup className="flatpickr">
                <Flatpickr
                  name="birding_session[start_time]"
                  className="form-control"
                  options={{
                    enableTime: true,
                    noCalendar: true,
                    time_24hr: true,
                    enableSeconds: false,
                    dateFormat: "H:i",
                    // To the nearest 5 minutes
                    defaultDate: new Date(Math.round((new Date()).getTime() / 300000) * 300000)
                  }}
                />
                <InputGroupAddon>
                  <i className="fa fa-clock-o" />
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <hr className="my-5" />
        <Row>
          <Col xs="12" md="4">
            <h5>Location</h5>
            <p>
              <small><b>Tip:</b> drag the marker for extra accuracy.</small>
            </p>
          </Col>
          <Col xs="12" md="8">
            {/* <SearchableMapWithMarker
              onPlaceChanged={this.placeChanged}
              onPositionChanged={this.positionUpdated}
              markerPosition={this.state.location}
            /> */}
          </Col>
        </Row>
        <hr className="my-5" />
        <Row>
          <Col xs="12" md="4">
            <h5>Birds</h5>
            <p>
              <small><b>Tip:</b> to add more details click the <i className="fa fa-pencil" /> icon.</small>
            </p>
          </Col>
          <Col xs="12" md="8">
            <Card className="bird-select">
              <CardHeader className="d-flex justify-content-between align-items-center">
                <SearchableBirdList country="gb" onBirdSelected={this.addBirdRecord} />
              </CardHeader>
              <EditableBirdList
                birdRecords={this.state.birdRecords}
                onBirdRemoved={this.removeBirdFromList}
                onBirdEdit={this.editBird} />
            </Card>
          </Col>
        </Row>
        {this.state.birdRecords.map(toHiddenFields)}

        {/* <EditBirdForm
          onBirdUpdated={this.birdRecordUpdated}
          isOpen={this.state.modalOpen}
          toggle={this.toggleEditBirdForm}
          bird={this.state.editingBird || {}}
          index={this.state.currentBirdIndex} /> */}
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <AddBirdRecords />,
    document.getElementById('add_birding_session'),
  )
})
