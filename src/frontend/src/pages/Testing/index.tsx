import React, { FC, useEffect } from 'react'

import { asyncFetchEvents } from 'store/slices/Events'
import { asyncFetchEventOccurrences } from 'store/slices/EventOccurrences'
import { useAppSelector, useAppDispatch } from 'store/TypedHooks'
import { getEventOccurrencesWithEvents } from 'store/selectors'

import Default from 'layouts/Default'

import { getJSON } from 'utils/fetch'

const Inner: FC = () => {
  const pathPrefix = '/api/users'

  const { events, isLoading: isLoadingEvents } = useAppSelector((state) => state.events)
  const { eventOccurrences, isLoading: isLoadingEventOccurrences } = useAppSelector((state) => state.eventOccurrences)
  const eventOccurrencesWithEvents = useAppSelector(getEventOccurrencesWithEvents)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (events == null) {
      dispatch(asyncFetchEvents())
      console.log('run it')
    }
    if (eventOccurrences == null) {
      dispatch(asyncFetchEventOccurrences())
      console.log('run it')
    }
  }, [dispatch, events, eventOccurrences])

  return (
    <>
      {/* {eventOccurrences == null && <button onClick={loadData}>{'Api Call'}</button>} */}
      {(isLoadingEventOccurrences == true || isLoadingEvents == true) && <div>{'loading...'}</div>}
      {eventOccurrencesWithEvents != null &&
        eventOccurrencesWithEvents.map((eventOccurrenceWithEvent) => {
          return (
            <ul key={eventOccurrenceWithEvent.eventOccurrence.id}>
              <li>{'Event Occurrence:'}</li>
              <li>{eventOccurrenceWithEvent.eventOccurrence.id}</li>
              <li>{eventOccurrenceWithEvent.eventOccurrence.start_time}</li>
              <li>{eventOccurrenceWithEvent.eventOccurrence.end_time}</li>
              <li>{'Event:'}</li>
              <li>{eventOccurrenceWithEvent.event.id}</li>
              <li>{eventOccurrenceWithEvent.event.name}</li>
              <li>{eventOccurrenceWithEvent.event.description}</li>
              <li>{eventOccurrenceWithEvent.event.updatedAt}</li>
              <li>{eventOccurrenceWithEvent.event.createdAt}</li>
            </ul>
          )
        })}
    </>
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
