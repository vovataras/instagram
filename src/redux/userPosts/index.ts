import { ActionsTypes, Actions } from './types'
import { PostArray } from '../../typings'

let initialState = {
  isLoaded: false,
  items: null as PostArray | null,
  error: null as string | null
}
type InitialStateType = typeof initialState

const userPostsReducer = (
  state = initialState,
  action: Actions
): InitialStateType => {
  switch (action.type) {
    case ActionsTypes.SET_POSTS:
      return {
        ...state,
        error: null,
        isLoaded: true,
        items: action.posts
      }
    case ActionsTypes.SET_ERROR:
      return {
        ...state,
        isLoaded: true,
        error: action.error
      }
    case ActionsTypes.RESET_STATE:
      return {
        ...state,
        ...initialState
      }
    default:
      return state
  }
}

export default userPostsReducer
