import React from 'react'
import ReactDOM from 'react-dom'
import BirdSelect from '../components/bird_select'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BirdSelect />,
    document.getElementById('bird_select'),
  )
})
