import axios from 'axios'
import { useState, useEffect } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'
  const [country, setCountry] = useState(null)

  useEffect(() => {
    axios
      .get(`${baseURL}/name/${name}`)
      .then(response => {
        setCountry({
          found: true,
          data: {
            name: response.data.name.common,
            capital: response.data.capital[0],
            population: response.data.population,
            flag: response.data.flags.png
          }
        })
      })
      .catch(() => {
        setCountry({
          found: false
        })
      })
  }, [name])

  return country
}