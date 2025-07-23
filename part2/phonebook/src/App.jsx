import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [showFilter, setShowFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initPerson => {
        setPersons(initPerson)
      })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={successMessage} type='success' />
      <Notification message={errorMessage} type='error' />
      <Filter showFilter={showFilter} setShowFilter={setShowFilter} />
      <h2>Add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        showFilter={showFilter}
        setPersons={setPersons}
      />
    </div>
  )
}

export default App