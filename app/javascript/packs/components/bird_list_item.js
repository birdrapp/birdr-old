import React from 'react'
import { ListGroupItem, Button } from 'reactstrap'

const Count = (props) => {
  const hasCount = props.count
  if (hasCount) {
    return <span>{hasCount} x </span>
  }
  return null
}

const CountAndName = (props) => {
  return [
    <Count key="1" count={props.count} />,
    <span key="2">{props.name}</span>
  ]
}

const Notes = (props) => {
  const hasNotes = props.notes

  if (hasNotes) {
    return  [
      <br key="1" />,
      <small key="2" className="text-muted text-truncated">
        {hasNotes}
      </small>
    ]
  }
  return null
}

class BirdListItem extends React.Component {
  constructor(props) {
    super(props)

    this.handleEditClick = this.handleEditClick.bind(this)
    this.handleRemoveClick = this.handleRemoveClick.bind(this)
  }

  handleEditClick(e) {
    e.preventDefault()
    this.props.onEditClicked(this.props.index)
  }

  handleRemoveClick(e) {
    e.preventDefault()
    const remove = confirm(`Are you sure you want to remove ${this.props.bird.commonName} from your list?`);
    if (remove) this.props.onRemoveClicked(this.props.index)
  }

  render() {
    return (
      <ListGroupItem className="birding-session-bird-result d-flex justify-content-start align-items-center">
        {
          this.props.bird.photos[0] &&
          <div className="bird-list-image">
            <img className="rounded-circle mr-2" style={{ width: '40px', height: '40px' }} src={this.props.bird.photos[0].thumbnail} />
          </div>
        }
        <div>
          <CountAndName count={this.props.bird.count} name={this.props.bird.commonName} />
          <Notes notes={this.props.bird.notes} />
        </div>

        <div className="actions ml-auto">
          <Button onClick={this.handleEditClick} outline size="sm" color="primary" className="mr-1">
            <i className="fa fa-pencil" /><span className="d-none d-sm-inline">&nbsp;Edit</span>
          </Button>
          <Button onClick={this.handleRemoveClick} size="sm" color="danger" className="remove-bird-record" data-confirm-message="Are you sure you want to remove {{name}} from your list?">
            <i className="fa fa-trash" />
          </Button>
        </div>
      </ListGroupItem>
    )
  }
}

export default BirdListItem
