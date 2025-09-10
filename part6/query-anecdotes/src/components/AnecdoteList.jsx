/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAnecdote } from '../requests'
import { useNotificationDispatch } from '../context/NotificationContext'

const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      ))
    },
  })
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    notificationDispatch({ type: "SET", payload: `anecdote '${anecdote.content}' voted`})
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR" })
    }, 5000);
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList