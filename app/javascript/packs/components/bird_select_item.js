import React from 'react'
import { ListGroupItem, Button } from 'reactstrap'

const fieldName = (attribute, index) => "birding_session[bird_records_attributes][" + index + "][" + attribute + "]"

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

const HiddenInput = (props) => <input value={props.value} className="form-control hidden" type="hidden" name={fieldName(props.attribute, props.index)} />

class BirdSelectItem extends React.Component {
  constructor(props) {
    super(props)

    this.handleEditClick = this.handleEditClick.bind(this)
  }

  handleEditClick = () => {
    this.props.onEditClicked(this.props.bird, this.props.index)
    return false
  }

  render() {
    return (
      <ListGroupItem className="birding-session-bird-result d-flex justify-content-start align-items-center">
        <HiddenInput value={this.props.bird.id} attribute="bird_id" index={this.props.index} />
        <HiddenInput attribute="count" index={this.props.index} />
        <HiddenInput attribute="notes" index={this.props.index} />
        <HiddenInput attribute="location" index={this.props.index} />

        <div>
          <CountAndName count={this.props.bird.count} name={this.props.bird.name} />
          <Notes notes={this.props.bird.notes} />
        </div>

        <div className="actions ml-auto">
          <Button onClick={this.handleEditClick} outline size="sm" color="primary" className="mr-1">
            <i className="fa fa-pencil" />
          </Button>
          <Button onClick={() => {}} outline size="sm" color="danger" className="remove-bird-record" data-confirm-message="Are you sure you want to remove {{name}} from your list?">
            <i className="fa fa-trash" />
          </Button>
        </div>
      </ListGroupItem>
    )
  }
}

export default BirdSelectItem
