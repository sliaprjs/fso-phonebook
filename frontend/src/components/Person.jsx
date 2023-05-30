import React from 'react'

const Person = ({person, onDelete}) => {
  return (
    <>
      <p key={person.name}>
      {person.name} {person.number}</p>
      <button onClick={() => onDelete(person.id)}>Delete</button>
    </>
    
    
  )
}

export default Person