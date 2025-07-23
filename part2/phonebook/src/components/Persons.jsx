import Person from "./Person"

const Persons = ({ persons, showFilter, setPersons }) => {
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(showFilter.toLowerCase())
  )

  return (
    <ul>
      {personsToShow.map(person =>
        <Person key={person.id} person={person} persons={persons} setPersons={setPersons}/>
      )}
    </ul>
  )
}

export default Persons