import { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newConutry, setNewCountry] = useState('')

  useEffect(() => {
    axios
    .get(`https://restcountries.com/v3.1/name/${newConutry}`)
    .then(response => {
      console.log(response.data)
      setCountries(response.data)
    })
  }, [newConutry])


  const handleCountryChange = (event) => {
    setNewCountry(event.target.value)
  }

  return (
    <div>
      <p>
        find countries <input value={newConutry} onChange={handleCountryChange} />
      </p>
      <Countries countries={countries}/>
    </div>
  )
}

export default App