import React from 'react'
import Select from 'react-select'
import BirdSelectItem from './bird_select_item'
import { Card, CardHeader, ListGroup } from 'reactstrap'
import $ from 'jquery'

const fetchBirds = () => {
  return $.getJSON('/bird_lists/gb/birds.json')
    .then((res) => {
      const options = res.birds.map((item) => ({
          value: item.bird.id,
          label: item.bird.common_name
      }))

      return options
    })
}

class BirdSelect extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      options: [],
      birds: []
    }
  }

  addBird = (opt) => {
    this.setState(prevState => ({
      birds: [...prevState.birds, {
        id: opt.value,
        name: opt.label,
        notes: null,
        count: null
      }]
    }))
  }

  componentDidMount = () => {
    fetchBirds().then((options) => { this.setState({ options }) })
  }

  render() {
    return (
      <Card className="bird-select">
        <CardHeader className="d-flex justify-content-between align-items-center">
          <Select
            name={this.props.name}
            value="one"
            options={this.state.options}
            className="bird-select"
            clearable={false}
            onChange={this.addBird}
          />
        </CardHeader>
        <ListGroup className="list-group-flush">
          {this.state.birds.map((bird, i) => (
            <BirdSelectItem key={i} bird={bird} index={i} />
          ))}
        </ListGroup>
      </Card>
    )
  }
}

export default BirdSelect
