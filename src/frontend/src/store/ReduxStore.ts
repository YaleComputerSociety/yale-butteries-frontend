import { configureStore } from '@reduxjs/toolkit'

import eventOccurrencesReducer from './slices/EventOccurrences'
import eventsReducer from './slices/Events'
import gamesReducer from './slices/Games'

const store = configureStore({
  reducer: {
    eventOccurrences: eventOccurrencesReducer,
    events: eventsReducer,
    games: gamesReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
