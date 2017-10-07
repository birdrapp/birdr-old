import React from 'react'
import { ListGroup } from 'reactstrap'
import BirdListItem from './bird_list_item'

class EditableBirdList extends React.Component {
  render() {
    return (
      <ListGroup className="list-group-flush">
        {this.props.birdRecords.map((bird, i) => (
          <BirdListItem
            key={i}
            bird={bird}
            index={i}
            onEditClicked={this.props.onBirdEdit}
            onRemoveClicked={this.props.onBirdRemoved} />
        ))}
      </ListGroup>
    )
  }
}

export default EditableBirdList
