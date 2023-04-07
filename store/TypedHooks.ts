import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './ReduxStore'

// These just add TypeScript functionality to basic redux functions
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): any => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
