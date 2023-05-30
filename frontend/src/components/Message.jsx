import React from 'react'

const Message = ({message}) => {
  console.log(message);
  return <p className={`message ${message === 'error' ? 'error' : null}`}>{message === 'success' ? 'New contact is added!' : 'Something went wrong'}</p>
}

export default Message