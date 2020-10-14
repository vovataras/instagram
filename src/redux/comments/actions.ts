import { CommentsObject } from '../../typings'
import { ActionsTypes, ResetState, SetComments, SetError } from './types'

export const setComments = (comments: CommentsObject): SetComments => ({
  type: ActionsTypes.SET_COMMENTS,
  comments
})

export const setError = (error: string): SetError => ({
  type: ActionsTypes.SET_ERROR,
  error
})

export const resetState = (): ResetState => ({
  type: ActionsTypes.RESET_STATE
})
