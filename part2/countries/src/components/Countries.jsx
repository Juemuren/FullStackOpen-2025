import Country from "./Country"
import CountryForm from "./CountryForm"

const Countries = ({ filter, countries }) => {

  const countryToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  if (countryToShow.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  else if (countryToShow.length > 1) {
    return (
      <CountryForm countries={countryToShow} />
    )
  }
  else if (countryToShow.length === 1) {
    return (
      <Country country={countryToShow[0]} />
    )
  }
  else {
    return (
      <p>No matched</p>
    )
  }
}

export default Countries