const CountryInfo = ({ country }) => {
  return (
    <>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((language, i) =>
          <li key={i}>{language}</li>
        )}
      </ul>
      <img src={country.flags.png}></img>
    </>
  )
}

export default CountryInfo