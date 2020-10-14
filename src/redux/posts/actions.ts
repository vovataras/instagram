import { PostArray } from '../../typings'
import { ActionsTypes, ResetState, SetError, SetPosts } from './types'

export const setPosts = (posts: PostArray): SetPosts => ({
  type: ActionsTypes.SET_POSTS,
  posts
})

export const setError = (error: string): SetError => ({
  type: ActionsTypes.SET_ERROR,
  error
})

export const resetState = (): ResetState => ({
  type: ActionsTypes.RESET_STATE
})
