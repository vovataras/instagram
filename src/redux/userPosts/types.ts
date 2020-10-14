import { PostArray } from "../../typings"

enum ActionsTypes {
  SET_POSTS = 'userPosts/SET_POSTS',
  SET_ERROR = 'userPosts/SET_ERROR',
  RESET_STATE = 'userPosts/RESET_STATE'
}

type SetPosts = {
  type: typeof ActionsTypes.SET_POSTS
  posts: PostArray
}

type SetError = {
  type: typeof ActionsTypes.SET_ERROR
  error: string
}

type ResetState = {
  type: typeof ActionsTypes.RESET_STATE
}

type Actions = SetPosts | SetError | ResetState

export { ActionsTypes }
export type { SetPosts, SetError, ResetState, Actions }
