import React from 'react'
import moment from 'moment'
import { Input } from 'reactstrap'

const timeOptions = (startTime, value) => {
  const start = moment(new Date(startTime))
  const end = moment(start).endOf("day")
  const options = []

  do {
    options.push(start.clone())
  } while(start.add(5, 'minutes').isBefore(end))

  return options.map((time, index) => <option key={index} value={time.clone().utc().format()}>{time.format('HH:mm')}</option>)
}

class TimeSelect extends React.Component {

  render() {
    return (
      <Input type="select" value={moment(this.props.value).utc().format()} name={this.props.name} onChange={this.props.onChange}>
        {timeOptions(this.props.startTime, this.props.value)}
      </Input>
    )
  }
}

export default TimeSelect
