import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const HelloWorld = ({ name }) => (
  <p>Hello {name}</p>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <HelloWorld name="React" />,
    document.body.appendChild(document.createElement('div')),
  )
})
