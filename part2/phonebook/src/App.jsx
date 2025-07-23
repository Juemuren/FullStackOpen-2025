import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [showFilter, setShowFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initPerson => {
        setPersons(initPerson)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter showFilter={showFilter} setShowFilter={setShowFilter} />
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h3>Numbers</h3>
      <Persons persons={persons} showFilter={showFilter} />
    </div>
  )
}

export default App