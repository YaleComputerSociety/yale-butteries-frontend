import { configureStore } from '@reduxjs/toolkit'

import eventOccurrencesReducer from './slices/EventOccurrences'
import eventsReducer from './slices/Events'

const store = configureStore({
  reducer: {
    eventOccurrences: eventOccurrencesReducer,
    events: eventsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
