import React from 'react'

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

class BirdSelectItem extends React.Component {
  render() {
    return <div className="list-group-item birding-session-bird-result d-flex justify-content-start align-items-center">
      <input value={this.props.bird.id} className="form-control hidden" type="hidden" name={fieldName("bird_id", this.props.index)} />
      <input value="" className="form-control hidden" type="hidden" name={fieldName("count", this.props.index)} />
      <input value="" className="form-control hidden" type="hidden" name={fieldName("location", this.props.index)} />
      <input value="" className="form-control hidden" type="hidden" name={fieldName("notes", this.props.index)} />

      <div>
        <CountAndName count={this.props.bird.count} name={this.props.bird.name} />
        <Notes notes={this.props.bird.notes} />
      </div>

      <div className="actions ml-auto">
        <a href="#" className="btn btn-outline-primary btn-sm mr-1" data-toggle="modal" data-target="#birdRecordModal">
          <i className="fa fa-pencil" />
        </a>
        <a href="#" className="btn btn-outline-danger btn-sm remove-bird-record" data-confirm-message="Are you sure you want to remove {{name}} from your list?" >
          <i className="fa fa-trash" />
        </a>
      </div>
    </div>
  }
}

export default BirdSelectItem
