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
export const setComments = (comments: CommentsObject): SetComments => ({
  type: ActionsTypes.SET_COMMENTS,
  comments
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

type Actions = SetComments | SetError | ResetState

export { ActionsTypes }
export type { Actions }
