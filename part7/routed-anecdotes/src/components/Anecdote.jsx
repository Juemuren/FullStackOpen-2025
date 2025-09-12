/* eslint-disable react/prop-types */
const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content} by <strong>{anecdote.user}</strong></h2>
    <div>has {anecdote.votes} votes</div>
    <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
  </div>
)

export default Anecdote