import React from 'react'
import Person from './Person';

const Persons = ({persons, onDelete}) => {
  return (
    persons.map(p => <Person key={p.id} person={p} onDelete={onDelete}/>
  ))
}

export default Persons;