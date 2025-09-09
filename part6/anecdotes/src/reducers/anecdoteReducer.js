import { createSlice } from '@reduxjs/toolkit'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteFor(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = { 
        ...anecdoteToVote, 
        votes: anecdoteToVote.votes + 1 
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote
      ).sort(
        (a, b) => b.votes - a.votes
      )
    },
    createAnecdote(state, action) {
      return state.concat(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { voteFor , createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer