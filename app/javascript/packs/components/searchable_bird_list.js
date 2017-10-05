import React from 'react'
import Select from 'react-select'
import $ from 'jquery'

class SearchableBirdList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [],
      isLoading: true
    }

    this.birdSelected = this.birdSelected.bind(this)
    this.fetchBirds = this.fetchBirds.bind(this)
  }

  fetchBirds() {
    return $.getJSON(`/bird_lists/${this.props.country}/birds.json`)
      .then((res) => {
        const options = res.birds.map((item) => ({
            value: item.bird.id,
            label: item.bird.common_name
        }))

        return options
      })
  }

  birdSelected = (opt) => {
    this.props.onBirdSelected({
      id: opt.value,
      commonName: opt.label
    });
  }

  componentDidMount = () => {
    this.fetchBirds()
      .then((options) => {
        this.setState({ options, isLoading: false })
      })
  }

  render() {
    return (
      <Select
        value="one"
        options={this.state.options}
        className="bird-select"
        clearable={false}
        onChange={this.birdSelected}
        isLoading={this.state.isLoading}
      />
    )
  }
}

export default SearchableBirdList
