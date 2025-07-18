import { useState } from "react"

import Country from "./Country"

const CountryForm = ({countries}) => {

  const [show, setShow] = useState(Array(10).fill(false))

  const handleShowClick = (i) =>  () => {
    const newShow = [...show]
    newShow[i] = !newShow[i]
    setShow(newShow)
  }

  return (
    <ul>
      {countries.map((country, i) =>
        <li key={i}>
          {country.name.common} <button onClick={handleShowClick(i)}>Show</button>
          {show[i] === true && <Country country={country} />}
        </li>
      )}
    </ul>
  )
}

export default CountryForm