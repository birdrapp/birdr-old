import React from 'react'
import ReactDOM from 'react-dom'
import EditableBirdList from '../components/editable_bird_list'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <EditableBirdList />,
    document.getElementById('bird_select'),
  )
})
