const Filter = ({ showFilter, setShowFilter }) => {
  const handleShowFilterChange = (event) => {
    setShowFilter(event.target.value)
  }

  return (
    <div>
      filter shown with<input value={showFilter} onChange={handleShowFilterChange} />
    </div>
  )
}

export default Filter