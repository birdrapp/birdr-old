import React from 'react'
import update from 'immutability-helper';
import BirdSelect from './bird_select'
import EditBirdForm from './edit_bird_form'

class EditableBirdList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editing: false,
      birdBeingEdited: {},
      currentIndex: null,
      birds: []
    }

    this.toggle = this.toggle.bind(this)
    this.handleEditBirdItemClick = this.handleEditBirdItemClick.bind(this);
    this.handleBirdUpdate = this.handleBirdUpdate.bind(this);
    this.addBirdToList = this.addBirdToList.bind(this);
  }

  toggle = () => {
    this.setState(prevState => ({
      editing: !prevState.editing
    }))
  }

  addBirdToList = (id, name) => {
    this.setState(prevState => ({
      birds: [...prevState.birds, {
        id,
        name,
        notes: "",
        count: ""
      }]
    }))
  }

  handleEditBirdItemClick = (bird, index) => {
    this.setState({
      editing: true,
      birdBeingEdited: bird,
      currentIndex: index
    })
  }

  handleBirdUpdate = (bird) => {
    const birds = update(this.state.birds, {
      [this.state.currentIndex]: {
        $merge: bird
      }
    })

    this.setState({
      birds,
      editing: false
    })
  }

  render() {
    return (
      <div>
        <BirdSelect
          birds={this.state.birds}
          onEditBirdItemClicked={this.handleEditBirdItemClick}
          onAddBird={this.addBirdToList} />

        <EditBirdForm
          onBirdUpdate={this.handleBirdUpdate}
          isOpen={this.state.editing}
          toggle={this.toggle}
          id={this.state.birdBeingEdited.id}
          birdName={this.state.birdBeingEdited.name}
          initialCount={this.state.birdBeingEdited.count}
          initialNotes={this.state.birdBeingEdited.notes} />
      </div>
    )
  }
}

export default EditableBirdList
