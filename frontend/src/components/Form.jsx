import React from 'react'

const Form = ({onFormSubmit, newName, newNumber, onNameInput, onNumberInput}) => {
  return (
    <form onSubmit={onFormSubmit}>
        <div>
          Name: <input value={newName} onChange={onNameInput}/>
        </div>
        <div>
          Number: <input value={newNumber} onChange={onNumberInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default Form