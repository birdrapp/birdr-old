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
      isLoading: true
    }
  }

  addBird = (opt) => {
    this.props.onAddBird(opt.value, opt.label);
  }

  componentDidMount = () => {
    fetchBirds().then((options) => { this.setState({ options, isLoading: false }) })
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
            isLoading={this.state.isLoading}
          />
        </CardHeader>
        <ListGroup className="list-group-flush">
          {this.props.birds.map((bird, i) => (
            <BirdSelectItem key={i} bird={bird} index={i} onEditClicked={this.props.onEditBirdItemClicked} />
          ))}
        </ListGroup>
      </Card>
    )
  }
}

export default BirdSelect
