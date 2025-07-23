import { useState } from 'react'

import personService from '../services/persons'

const PersonForm = ({ persons, setPersons, setMessage }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const isSame = persons.some(person =>
      person.name === newName
    )
    if (isSame) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changePerson = { ...person, number: newNumber }
        personService
          .update(person.id, changePerson)
          .then(changedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : changedPerson))
            setNewName('')
            setNewNumber('')
            setMessage(`Changed ${changePerson.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${createdPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm