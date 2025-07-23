import { useState } from 'react'
import axios from 'axios'

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const isSame = persons.some(person =>
      person.name === newName
    )
    if (isSame) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      axios
        .post('http://localhost:3001/persons', nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
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
    <form onSubmit={addName}>
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