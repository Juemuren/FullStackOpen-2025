import { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
    .get("https://restcountries.com/v3.1/all?fields=capital,area,name,languages,flags,capitalInfo")
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} />
      <Countries filter={filter} countries={countries}/>
    </div>
  )
}

export default App