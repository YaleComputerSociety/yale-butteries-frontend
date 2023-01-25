import { configureStore } from '@reduxjs/toolkit'

import usersReducer from './slices/Users'
<<<<<<< HEAD
=======
import currentUserReducer from './slices/CurrentUser'
>>>>>>> prisma
import eventsReducer from './slices/Events'
import eventOccurrencesReducer from './slices/EventOccurrences'
import usersEventOccurrencesReducer from './slices/UsersEventOccurrences'
import gamesReducer from './slices/Games'
import statsReducer from './slices/Stats'
import roomsReducer from './slices/Rooms'

const store = configureStore({
  reducer: {
    users: usersReducer,
<<<<<<< HEAD
=======
    currentUser: currentUserReducer,
>>>>>>> prisma
    events: eventsReducer,
    eventOccurrences: eventOccurrencesReducer,
    usersEventOccurrences: usersEventOccurrencesReducer,
    games: gamesReducer,
    stats: statsReducer,
    rooms: roomsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store
