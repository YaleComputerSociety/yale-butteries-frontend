import { configureStore } from '@reduxjs/toolkit'

import eventOccurrencesReducer from './slices/EventOccurrences'
import usersReducer from './slices/Users'
import eventsReducer from './slices/Events'
import gamesReducer from './slices/Games'
import statsReducer from './slices/Stats'

const store = configureStore({
  reducer: {
    eventOccurrences: eventOccurrencesReducer,
    events: eventsReducer,
    users: usersReducer,
    games: gamesReducer,
    stats: statsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
