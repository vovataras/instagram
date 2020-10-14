import { UsersObject } from '../../typings'
import { ActionsTypes, ResetState, SetError, SetUsers } from './types'

export const setUsers = (users: UsersObject): SetUsers => ({
  type: ActionsTypes.SET_USERS,
  users
})

export const setError = (error: string): SetError => ({
  type: ActionsTypes.SET_ERROR,
  error
})

export const resetState = (): ResetState => ({
  type: ActionsTypes.RESET_STATE
})
