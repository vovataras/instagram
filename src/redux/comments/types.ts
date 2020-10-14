import { CommentsObject } from '../../typings'

enum ActionsTypes {
  SET_COMMENTS = 'comments/SET_COMMENTS',
  SET_ERROR = 'comments/SET_ERROR',
  RESET_STATE = 'comments/RESET_STATE'
}

type SetComments = {
  type: typeof ActionsTypes.SET_COMMENTS
  comments: CommentsObject
}

type SetError = {
  type: typeof ActionsTypes.SET_ERROR
  error: string
}

type ResetState = {
  type: typeof ActionsTypes.RESET_STATE
}

type Actions = SetComments | SetError | ResetState

export { ActionsTypes }
export type { SetComments, SetError, ResetState, Actions }
