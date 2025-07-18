import Country from "./Country"

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <p>
        Too many matches, specify another filter
      </p>
    )
  }
  else if (countries.length > 1) {
    return (
      <ul>
        {countries.map(country =>
          <li key={country.name.common}>{country.name.common}</li>
        )}
      </ul>
    )
  }
  else if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  }
}

export default Countries