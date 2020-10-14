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

type SetError = {
  type: typeof ActionsTypes.SET_ERROR
  error: string
}

type ResetState = {
  type: typeof ActionsTypes.RESET_STATE
}

type Actions = SetUsers | SetError | ResetState

export { ActionsTypes }
export type { SetUsers, SetError, ResetState, Actions }
