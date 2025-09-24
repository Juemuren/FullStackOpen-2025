import { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client/react'

import { GENRE_BOOK, FAVORITE_GENRE } from '../queries'

const RecommendGQL = (props) => {
  const [books, setBooks] = useState([])
  const user = useQuery(FAVORITE_GENRE)
  const [genreQuery, genreResult] = useLazyQuery(GENRE_BOOK)

  useEffect(() => {
    if (genreResult.data) {
      setBooks(genreResult.data.allBooks)
    }
  }, [genreResult, setBooks])

  useEffect(() => {
    if (user.data) {
      genreQuery({ variables: { genre: user.data.me.favoriteGenre } })
    }
  }, [user, genreQuery])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations with GraphQL</h2>
      <p>books in your favorite genre {user.data.me.favoriteGenre}</p>

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
    </div>
  )
}

export default RecommendGQL
