import React from 'react'

const ErrorText = (props) => {
  if (props.error) {
    return (
      <div className={"d-block invalid-feedback " + props.className}>
        {props.error}
      </div>
    )
  }
  return null;
}

export default ErrorText
