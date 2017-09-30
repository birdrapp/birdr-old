import React from 'react';
import Select from 'react-select';
import $ from 'jquery';

const fetchBirds = () => {
  return $.getJSON('/bird_lists/gb/birds.json')
    .then((res) => {
      const options = res.birds.map((item) => ({
          value: item.bird.id,
          label: item.bird.common_name
      }));

      return options;
    });
}

class BirdSelect extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      options: []
    }
  }

  componentDidMount = () => {
    fetchBirds().then((options) => { this.setState({ options }) });
  };

  render() {
    return <div className="card bird-select">
      <div className="card-header d-flex justify-content-between align-items-center">
        <Select
          name="{this.props.name}"
          value="one"
          options={this.state.options}
          className="bird-select"
          clearable={false}
        />
      </div>
    </div>
  }
}

export default BirdSelect;
