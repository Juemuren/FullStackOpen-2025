import personService from '../services/persons'

const Person = ({ person, persons, setPersons }) => {
  const deletePerson = (id) => {
    const deletePerson = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${deletePerson.name} ?`)) {
      personService
        .deleteOne(id)
        .then(deletedPerson => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
    else {

    }

  }
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person.id)}>delete</button>
    </li>
  )
}

export default Person