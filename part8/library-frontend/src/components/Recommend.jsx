import { useQuery } from '@apollo/client/react'

import { FAVORITE_GENRE, ALL_BOOKS } from '../queries'

const Recommend = ({ show }) => {
  const genreResult = useQuery(FAVORITE_GENRE)
  const bookResult = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }

  if (genreResult.loading || bookResult.loading) {
    return <div>loading...</div>
  }

  const genre = genreResult.data.me.favoriteGenre
  const books = bookResult.data.allBooks
  const bookToShow = books.filter((b) => b.genres.includes(genre))

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre {genre}</p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookToShow.map((a) => (
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

export default Recommend
