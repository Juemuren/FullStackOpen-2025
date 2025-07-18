import Person from "./Person"

const Persons = ({ persons, showFilter }) => {
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(showFilter.toLowerCase())
  )

  return (
    <ul>
      {personsToShow.map(person =>
        <Person key={person.id} person={person} />
      )}
    </ul>
  )
}

export default Persons