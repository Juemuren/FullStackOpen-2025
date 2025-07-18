import { useState, useEffect } from "react"
import axios from 'axios'

import Weather from "./Weather"
import CountryInfo from "./CountryInfo"

const Country = ({ country }) => {

  const [weather, setWeather] = useState({})

  const api_key = import.meta.env.VITE_API_KEY
  const lat = country.capitalInfo.latlng[0]
  const lon = country.capitalInfo.latlng[1]

  useEffect(() => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    .then(response => {
      setWeather(response.data)
    })
  }, [country])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <CountryInfo country={country} />
      <h3>Weather in {country.capital[0]}</h3>
      <Weather weather={weather} />
    </div>
  )
}

export default Country