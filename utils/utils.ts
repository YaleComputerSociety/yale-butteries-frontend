// Various functions to be used across multiple files

import { useAppSelector } from "../store/ReduxStore"
import { College } from "./types"

export const getCollegeFromId = (id: number, colleges: College[]): College => {
    return colleges.find(college => college.id === id)
}