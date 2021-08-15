interface ModelInstance {
  id: number
  created_at: Date
  updated_at: Date
}

export interface Game extends ModelInstance {
  team_1_score: number
  team_2_score: number
  date: string
  sport: string
  team1: string
  team2: string
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
  event_type: string
  recurrence_type: string
  approval_status: string
}

export interface Room extends ModelInstance {
  room_name: string
  needs_approval: boolean
  college: string
  recurrence_types: string[]
}

export interface UserEventOccurrence extends ModelInstance {
  user_id: number
  event_occurrence_id: number
  attendance_status: string
}

export interface EventOccurrence extends ModelInstance {
  event_id: number
  description: string | null
  start_time: Date
  end_time: Date
}
