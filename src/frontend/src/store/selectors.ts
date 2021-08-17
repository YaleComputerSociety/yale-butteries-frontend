import { createSelector } from '@reduxjs/toolkit'
import { EventOccurrence } from './slices/EventOccurrences'
import { Event } from './slices/Events'

interface EventOccurrenceWithEvent {
  eventOccurrence: EventOccurrence
  event: Event
}

const getEventOccurrences = (state) => state.eventOccurrences.eventOccurrences
const getEvents = (state) => state.events.events

export const getEventOccurrencesWithEvents = createSelector(
  [getEventOccurrences, getEvents],
  (eventOccurrences: EventOccurrence[], events: Event[]): EventOccurrenceWithEvent[] | null => {
    if (eventOccurrences == null || events == null) {
      return null
    }
    return eventOccurrences.map((eventOccurrence) => {
      const eventIndex = events.findIndex((singleEvent) => singleEvent.id == eventOccurrence.event_id)
      return {
        eventOccurrence: eventOccurrence,
        event: events[eventIndex],
      }
    })
  }
)
