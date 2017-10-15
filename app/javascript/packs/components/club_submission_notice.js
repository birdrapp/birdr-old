
import React from 'react'
import axios from 'axios'

class ClubSubmissionNotice extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      clubs: []
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.location !== this.props.location) {
      this.findClubs(newProps.location)
        .then((clubs) => {
          const clubString = clubs.map(c => c.short_name).join(', ')
          this.setState({
            clubs: clubString
          })
        })
    }
  }

  findClubs(location) {
    return axios.get(`/user/clubs.json?lat=${location.lat}&lng=${location.lng}`).then(({ data }) => {
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
