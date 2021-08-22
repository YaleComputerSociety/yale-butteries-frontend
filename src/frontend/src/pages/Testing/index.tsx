import React, { FC, useEffect, useMemo } from 'react'

import { useAppSelector, useAppDispatch } from 'store/TypedHooks'
import { getGamesWithUserStats, getUsersWithUsersEventOccurrences } from 'store/selectors'
import { asyncFetchUsers } from 'store/slices/Users'
import { asyncFetchEventOccurrences } from 'store/slices/EventOccurrences'
import { asyncFetchUsersEventOccurrences } from 'store/slices/UsersEventOccurrences'

import { EventOccurrence } from 'store/slices/EventOccurrences'

import Default from 'layouts/Default'

const TestSelect: FC<{ eventOccurrence: EventOccurrence }> = ({ eventOccurrence }) => {
  const usersWithUsersEventOccurrences = useAppSelector(getUsersWithUsersEventOccurrences)

  const selectedUsersWithUserEventOccurrence = useMemo(
    () =>
      usersWithUsersEventOccurrences.filter(
        (userWithUserEventOccurrence) =>
          userWithUserEventOccurrence.userEventOccurrence.event_occurrence_id == eventOccurrence.id
      ),
    [usersWithUsersEventOccurrences, eventOccurrence.id]
  )

  return (
    <div>
      <div>{`Event Occurrence: ${eventOccurrence.id}`}</div>
      {selectedUsersWithUserEventOccurrence.map((userWithUserEventOccurrence) => {
        return (
          <div
            key={userWithUserEventOccurrence.user.id}
          >{`User: ${userWithUserEventOccurrence.user.id}, attendance status: ${userWithUserEventOccurrence.userEventOccurrence.attendance_status}`}</div>
        )
      })}
    </div>
  )
}

const Inner: FC = () => {
  const dispatch = useAppDispatch()
  const { users, isLoading: isLoadingUsers } = useAppSelector((state) => state.users)
  const { eventOccurrences, isLoading: isLoadingEventOccurrences } = useAppSelector((state) => state.eventOccurrences)
  const { usersEventOccurrences, isLoading: isLoadingUsersEventOccurrences } = useAppSelector((state) => state.usersEventOccurrences)

  useEffect(() => {
    if (users == null) {
      dispatch(asyncFetchUsers())
    }
  }, [dispatch, users])

  useEffect(() => {
    if (eventOccurrences == null) {
      dispatch(asyncFetchEventOccurrences())
    }
  }, [dispatch, eventOccurrences])

  useEffect(() => {
    if (usersEventOccurrences == null) {
      dispatch(asyncFetchUsersEventOccurrences())
    }
  }, [dispatch, usersEventOccurrences])


  return (
  )
}

const Testing: FC = () => {
  return (
    <Default>
      <Inner />
    </Default>
  )
}

export default Testing
