const Filter = ({filter, setFilter}) => {
  
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <p>
      find countries: <input value={filter} onChange={handleFilterChange} />
    </p>
  )
}

export default Filter