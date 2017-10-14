
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
        this.setState({
          clubs
        })
      })
  }

  findClubs(location) {
    return axios.get(`/user/clubs?point=${location}`).then(({ data }) => data)
  }

  render() {
    return (
      this.state.clubs.length > 0 ?
      <Alert>
        {this.state.clubs}
      </Alert>
      : ''
    )
  }
}

export default ClubSubmissionNotice
