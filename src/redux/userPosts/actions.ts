import { Post } from '../../typings'

enum ActionsTypes {
  SET_POSTS = 'userPosts/SET_POSTS',
  SET_ERROR = 'userPosts/SET_ERROR',
  RESET_STATE = 'userPosts/RESET_STATE'
}

type SetPosts = {
  type: typeof ActionsTypes.SET_POSTS
  posts: Array<Post>
}
export const setPosts = (posts: Array<Post>): SetPosts => ({
  type: ActionsTypes.SET_POSTS,
  posts
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

type Actions = SetPosts | SetError | ResetState

export { ActionsTypes }
export type { Actions }
