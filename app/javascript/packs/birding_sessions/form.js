import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import update from 'immutability-helper'
import { Button, Row, Col, FormGroup, Label, Input, Card, CardHeader, ListGroup, InputGroup, InputGroupAddon } from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import ClubSubmissionNotice from '../components/club_submission_notice'
import EditableBirdList from '../components/editable_bird_list'
import EditBirdForm from '../components/edit_bird_form'
import ErrorText from '../components/error_text'
import SearchableBirdList from '../components/searchable_bird_list'
import SearchableMapWithMarker from '../components/searchable_map_with_marker'
import 'react-select/dist/react-select.css';
import 'flatpickr/dist/flatpickr.css';


const birdRecordFieldName = (attribute, index, multi = false) => {
  var name = "birding_session[bird_records_attributes][" + index + "][" + attribute + "]"
  if (multi) name += "[]"
  return name
}
const BirdRecordHiddenInput = (props) => <input value={props.value} className="form-control hidden" type="hidden" name={birdRecordFieldName(props.attribute, props.index, props.multi)} />
const locationToWkt = (location) => {
  if (!location) return '';
  return `POINT(${location.lng} ${location.lat})`
}

class AddBirdRecords extends React.Component {
  constructor(props) {
    super(props)
    const session = props.birdingSession

    this.state = {
      date: session.date || new Date(),
      time: session.time || new Date(Math.round((new Date()).getTime() / 300000) * 300000), // Nearest 5 minutes
      location: session.location,
      locationName: session.locationName || "",
      countryCode: session.countryCode || "",
      countryName: session.countryName || "",
      editingBird: null,
      currentBirdIndex: null,
      modalOpen: false,
      birdRecords: session.birdRecords || []
    }

    this.addBirdRecord = this.addBirdRecord.bind(this)
    this.birdRecordUpdated = this.birdRecordUpdated.bind(this)
    this.dateUpdated = this.dateUpdated.bind(this)
    this.editBird = this.editBird.bind(this)
    this.placeChanged = this.placeChanged.bind(this)
    this.positionUpdated = this.positionUpdated.bind(this)
    this.removeBirdFromList = this.removeBirdFromList.bind(this)
    this.timeUpdated = this.timeUpdated.bind(this)
    this.toggleEditBirdForm = this.toggleEditBirdForm.bind(this)
  }

  addBirdRecord(bird) {
    this.setState(prevState => ({
      birdRecords: [...prevState.birdRecords, {
        bird_id: bird.id,
        commonName: bird.commonName,
        notes: "",
        count: "",
        time: "",
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

  dateUpdated(date) {
    this.setState({
      date
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
    const countryCode = place.address_components.filter(c => c.types.includes('country')).map(c => c.short_name)
    this.setState({
      location,
      countryCode,
      locationName: place.name,
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

  timeUpdated(time) {
    this.setState({
      time
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
                  className={(this.props.errors.date ? "is-invalid": "")}
                  value={this.state.date}
                  onChange={value => this.dateUpdated(value[0])}
                  options={{ altInput: true, maxDate: new Date(), defaultDate: new Date() }}
                />
                <InputGroupAddon>
                  <i className="fa fa-calendar" />
                </InputGroupAddon>
              </InputGroup>
              <ErrorText error={this.props.errors.date} />
            </FormGroup>
          </Col>
          <Col xs="12" md="4">
            <FormGroup>
              <Label for="birding_session_time">Time</Label>
              <InputGroup className="flatpickr">
                <Flatpickr
                  name="birding_session[time]"
                  className={"form-control" + (this.props.errors.time ? " is-invalid": "")}
                  onChange={dates => this.timeUpdated(dates[0])}
                  value={this.state.time}
                  options={{
                    enableTime: true,
                    noCalendar: true,
                    time_24hr: true,
                    enableSeconds: false
                  }}
                />
                <InputGroupAddon>
                  <i className="fa fa-clock-o" />
                </InputGroupAddon>
              </InputGroup>
              <ErrorText error={this.props.errors.time} />
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
            <SearchableMapWithMarker
              searchText={this.state.locationName ? `${this.state.locationName}, ${this.state.countryName}` : ''}
              onPlaceChanged={this.placeChanged}
              onPositionChanged={this.positionUpdated}
              markerPosition={this.state.location}
              defaultCenter={this.props.birdingSession.location}
              error={this.props.errors.location}
            />
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
            <ErrorText className="mb-2" error={this.props.errors.bird_records} />
            <Card className={"bird-select" + (this.props.errors.bird_records ? " border-danger": "")}>
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
        <Row>
          <Col xs="12" md="4">
            <Button className="mt-4" color="primary">Save Bird Records</Button>
            <div className="mt-2">
              <ClubSubmissionNotice location={this.state.location} />
            </div>
          </Col>
        </Row>
        <Input type="hidden" name="birding_session[location]" value={locationToWkt(this.state.location)} />
        <Input type="hidden" name="birding_session[location_name]" value={this.state.locationName} />
        <Input type="hidden" name="birding_session[country_code]" value={this.state.countryCode} />
        {this.state.birdRecords.map((birdRecord, index) => (
          <div key={index}>
            {
              birdRecord.id ?
              <BirdRecordHiddenInput value={birdRecord.id} attribute="id" index={index} />
              : ''
            }
            <BirdRecordHiddenInput value={birdRecord.bird_id} attribute="bird_id" index={index} />
            <BirdRecordHiddenInput value={birdRecord.count} attribute="count" index={index} />
            <BirdRecordHiddenInput value={birdRecord.notes} attribute="notes" index={index} />
            {
              locationToWkt(birdRecord.location) !== locationToWkt(this.state.location) &&
              <BirdRecordHiddenInput value={locationToWkt(birdRecord.location)} attribute="location" index={index} />
            }
            {
              this.state.time !== birdRecord.time &&
              <BirdRecordHiddenInput value={birdRecord.time} attribute="time" index={index} />
            }
            <div>
              {birdRecord.photos.map((photo, photoIndex) => (
                <BirdRecordHiddenInput key={photoIndex} multi value={photo.id} attribute="photo_ids" index={index} />
              ))}
            </div>
          </div>
        ))}

        <EditBirdForm
          onBirdUpdated={this.birdRecordUpdated}
          isOpen={this.state.modalOpen}
          toggle={this.toggleEditBirdForm}
          sessionTime={this.state.time}
          bird={this.state.editingBird || {}}
          index={this.state.currentBirdIndex} />
      </div>
    )
  }
}

window.init = () => {
  const node = document.getElementById('birding_session_form')
  const session = JSON.parse(node.getAttribute('data-birding-session'))
  const errors = JSON.parse(node.getAttribute('data-errors'))

  const wktToObject = wkt => {
    if (!wkt) return null;

    wkt = wkt.replace('POINT (', '')
    wkt = wkt.replace(')', '')
    const parts = wkt.split(' ')
    return {
      lat: parseFloat(parts[1]),
      lng: parseFloat(parts[0])
    }
  }

  const photoToProps = (photo) => ({
    id: photo.id,
    thumbnail: photo.image.thumb.url,
    url: photo.image.url
  })

  const birdRecordToProps = (birdRecord) => ({
    commonName: birdRecord.bird.common_name,
    count: birdRecord.count || '',
    notes: birdRecord.notes || '',
    location: wktToObject(birdRecord.location),
    bird_id: birdRecord.bird_id,
    id: birdRecord.id,
    time: birdRecord.time ? moment(birdRecord.time).format('HH:mm') : '',
    photos: birdRecord.photos.map(photoToProps)
  })

  const sessionToProps = (session) => ({
    date: session.date,
    time: session.time ? moment(session.time).format('HH:mm') : '',
    location: wktToObject(session.location),
    locationName: session.location_name,
    countryCode: session.country_code,
    countryName: session.country_name,
    birdRecords: session.bird_records.map(birdRecordToProps)
  })

  ReactDOM.render(
    <AddBirdRecords errors={errors} birdingSession={sessionToProps(session)} />,
    node,
  )
}
