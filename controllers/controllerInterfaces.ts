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
  imgame_id?: number[]
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

export interface PositionEventType extends ModelInstance {
  event_type_id: number
  position: string
}

export interface RoomRecurrenceType extends ModelInstance {
  room_id: number
  recurrenceType: string
}
