import React from 'react'
import Select from 'react-select'
import { filter, score } from 'fuzzaldrin'
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

  filterOptions(options, query) {
    if (query === '') return options

    const filteredOptions = filter(options, query, { key: 'label' })
    return filteredOptions.sort((a, b) => {
      const scoreA = score(a.label, query)
      const scoreB = score(b.label, query)

      if (scoreA < scoreB) return 1
      if (scoreA > scoreB) return -1
      return 0
    });
  }

  render() {
    return (
      <Select
        value="one"
        placeholder="Search for a bird..."
        filterOptions={this.filterOptions}
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
