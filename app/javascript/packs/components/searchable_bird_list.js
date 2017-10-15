import React from 'react'
import Select from 'react-select'
import { filter, score } from 'fuzzaldrin'
import axios from 'axios'

class SearchableBirdList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [],
      isLoading: false,
      disabled: true,
      placeholderText: 'Choose a location to enable the bird list'
    }

    this.birdSelected = this.birdSelected.bind(this)
    this.fetchBirds = this.fetchBirds.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.location !== this.props.location) {
      this.setState({
        isLoading: true,
        placeholderText: 'Loading bird list...'
      })
      this.fetchBirds(newProps.location)
        .then((birdList) => {
          const options = this.parseOptions(birdList.birds)

          this.setState({
            options,
            listName: birdList.bird_list.name,
            placeholderText: 'Enter a bird name to search...',
            isLoading: false,
          })
        })
    }
  }

  parseOptions(birds) {
    return birds.map(b => ({
      value: b.bird.id,
      label: b.bird.common_name
    }))
  }

  fetchBirds(location) {
    return axios.get(`/bird_lists/birds.json?lng=${location.lng}&lat=${location.lat}`)
      .then(({ data }) => {
        return data
      })
  }

  birdSelected = (opt) => {
    this.props.onBirdSelected({
      id: opt.value,
      commonName: opt.label
    });
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
        placeholder={this.state.placeholderText}
        filterOptions={this.filterOptions}
        options={this.state.options}
        className="bird-select"
        clearable={false}
        disabled={this.state.options.length === 0}
        onChange={this.birdSelected}
        isLoading={this.state.isLoading}
      />
    )
  }
}

export default SearchableBirdList
