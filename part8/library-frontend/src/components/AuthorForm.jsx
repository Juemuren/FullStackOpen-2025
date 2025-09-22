import { useState } from 'react'
import Select from 'react-select'

import { useMutation } from '@apollo/client/react'

import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const AuthorForm = ({ authors }) => {
  const names = authors.map((a) => ({ value: a.name, label: a.name }))

  const [selectedName, setSelectedName] = useState(null)
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: selectedName.value, born: Number(born) } })

    setSelectedName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <Select defaultValue={selectedName} onChange={setSelectedName} options={names} />
        <div>
          born
          <input type="number" value={born} onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default AuthorForm
