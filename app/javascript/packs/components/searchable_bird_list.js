import React from 'react'
import Select from 'react-select'
import createFilterOptions from 'react-select-fast-filter-options'
import axios from 'axios'

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
    return axios.get(`/bird_lists/${this.props.country}/birds.json`)
      .then(({ data }) => {
        const options = data.birds.map((item) => ({
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
        placeholder="Search for a bird..."
        filterOptions={createFilterOptions({ options: this.state.options })}
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
