import { UsersObject } from '../../typings'

enum ActionsTypes {
  SET_USERS = 'users/SET_USERS',
  SET_ERROR = 'users/SET_ERROR',
  RESET_STATE = 'users/RESET_STATE'
}

type SetUsers = {
  type: typeof ActionsTypes.SET_USERS
  users: UsersObject
}
export const setUsers = (users: UsersObject): SetUsers => ({
  type: ActionsTypes.SET_USERS,
  users
})

type SetError = {
  type: typeof ActionsTypes.SET_ERROR
  error: string
}
export const setError = (error: string): SetError => ({
  type: ActionsTypes.SET_ERROR,
  error
})

type ResetState = {
  type: typeof ActionsTypes.RESET_STATE
}
export const resetState = (): ResetState => ({
  type: ActionsTypes.RESET_STATE
})

type Actions = SetUsers | SetError | ResetState

export { ActionsTypes }
export type { Actions }
