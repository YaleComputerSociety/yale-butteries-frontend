interface ModelInstance {
  id: number
  createdAt: Date
  updatedAt: Date
}

export interface Game extends ModelInstance {
  team_1_score: number
  team_2_score: number
  date: string
  sport: string
  teamOne: string
  teamTwo: string
}

export interface Stat extends ModelInstance {
  points: number
  rebounds: number
  assists: number
  imgame_id: number
  user_id: number
}

export interface User extends ModelInstance {
  netid: string
  name: string
  position: string
  college: string
}

export interface Event extends ModelInstance {
  name: string
  description: string
  room_id: number
  user_id: number
  eventType: string
  recurrenceType: string
  approvalStatus: string
}

export interface Room extends ModelInstance {
  room_name: string
  needs_approval: boolean
  college: string
  recurrenceTypes: string[]
}

export interface UserEventOccurrence extends ModelInstance {
  user_id: number
  event_occurrence: number
  attendanceStatus: string
}

export interface EventOccurrence extends ModelInstance {
  event_id: number
  description: string | null
  start_time: Date
  end_time: Date
}
