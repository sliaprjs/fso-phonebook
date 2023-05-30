import React from 'react'
import Persons from './Persons';

const PersonsList = ({filtered, persons, onDelete}) => {
  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filtered.toLowerCase()));

  return (
    filtered ? <Persons persons={filteredPersons} onDelete={onDelete}/> : <Persons persons={persons} onDelete={onDelete}/>
  )
}

export default PersonsList