import { useQuery } from '@tanstack/react-query'

import { getAnecdotes } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'

const App = () => {

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
    refetchOnWindowFocus: false
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList anecdotes={anecdotes} />
    </div>
  )
}

export default App
