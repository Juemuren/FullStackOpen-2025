import { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client/react'

import { ALL_BOOKS, GENRE_BOOK } from '../queries'

const BooksGQL = (props) => {
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState(null)
  const [genres, setGenres] = useState([])
  const allBookResult = useQuery(ALL_BOOKS)
  const [genreQuery, genreResult] = useLazyQuery(GENRE_BOOK)

  useEffect(() => {
    if (genreResult.data) {
      setBooks(genreResult.data.allBooks)
    }
  }, [genreResult, setBooks])

  useEffect(() => {
    genreQuery({ variables: { genre } })
  }, [genre, genreQuery])

  useEffect(() => {
    if (allBookResult.data) {
      const allBooks = allBookResult.data.allBooks
      setGenres([...new Set(allBooks.flatMap((book) => book.genres))])
    }
  }, [allBookResult, setGenres])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books with GraphQL</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map((g) => (
          <button key={g} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default BooksGQL
