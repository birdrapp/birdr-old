
import React from 'react'
import axios from 'axios'
import { Alert } from 'reactstrap'

class ClubSubmissionNotice extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      clubs: []
    }
  }

  componentWillReceiveProps(newProps) {
    this.findClubs(newProps.location)
      .then((clubs) => {
        const clubString = clubs.map(c => c.short_name).join(', ')
        this.setState({
          clubs: clubString
        })
      })
  }

  findClubs(location) {
    const wkt = `POINT(${location.lng} ${location.lat})`
    return axios.get(`/user/clubs.json?location=${wkt}`).then(({ data }) => {
      return data.clubs
    })
  }

  render() {
    return (
      this.state.clubs.length > 0 ?
        <small className="text-danger">
          These records fall within the <b>{this.state.clubs}</b> recording area and will be submitted automatically.
        </small>
      : ''
    )
  }
}

export default ClubSubmissionNotice
